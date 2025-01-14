import { readFromLocalStorage } from "../utils/localStorageUtil";
import { ProductType } from "@/utils/types";

interface SalesforceInteractions {
  userChatMessage: (chatMessage: string) => void;
  viewProduct: (id: number, productName: string, productDescription: string) => void;
  userLoggedInHook: (firstName: string, lastName: string, email: string, phoneNumber: string) => void;
  userLoggedOutHook: (firstName: string, lastName: string, email: string, phoneNumber: string) => void;
  personalizationBanner: (category: [string]) => Promise<string>;
  personalizationProductRecommendations: (category: [string], anchorId?: string) => Promise<ProductType[]>;
}

const useSalesforceInteractions = (): SalesforceInteractions => {
  const userLoggedIn = JSON.parse(readFromLocalStorage("isAuthenticated") as string);

  const userChatMessageFunction = (chatMessage: string) => {
    if (window.SalesforceInteractions === undefined) {
      return;
    }

    if (userLoggedIn) {
      const user = JSON.parse(readFromLocalStorage("user") as string);

      const attributes = {
        eventType: "identity",
        firstName: user.firstName,
        lastName: user.lastName,
        isAnonymous: "1",
        email: user.email,
        phoneNumber: user.phoneNumber,
      };

      // Send to Salesforce Data Cloud that a known user added a product to the cart
      window.SalesforceInteractions.sendEvent({
        interaction: {
          name: "chatMessage",
          chatMessage,
          eventType: "chatActivities",
          category: "Engagement",
        },
        user: {
          attributes,
        },
      });

      return;
    }

    // Send to Salesforce Data Cloud that an unknown user added a product to the cart
    window.SalesforceInteractions.sendEvent({
      interaction: {
        name: "chatMessage",
        chatMessage,
        eventType: "chatActivities",
        category: "Engagement",
      },
    });
  };

  const viewProductDetailsFunction = (id: number, productName: string, productDescription: string) => {
    if (window.SalesforceInteractions === undefined) {
      return;
    }

    if (userLoggedIn) {
      const user = JSON.parse(readFromLocalStorage("user") as string);

      const attributes = {
        eventType: "identity",
        firstName: user.firstName,
        lastName: user.lastName,
        isAnonymous: "1",
        email: user.email,
        phoneNumber: user.phoneNumber,
      };

      // Send to Salesforce Data Cloud that a known user viewed a product
      window.SalesforceInteractions.sendEvent({
        interaction: {
          name: window.SalesforceInteractions.CatalogObjectInteractionName.ViewCatalogObject,
          catalogObject: {
            type: "Product",
            id: id.toString(),
            attributes: {
              productDescription,
              productName,
            },
          },
        },
        user: {
          attributes,
        },
      });

      return;
    }

    // Send to Salesforce Data Cloud that an unknown user viewed the details of a product
    window.SalesforceInteractions.sendEvent({
      interaction: {
        name: window.SalesforceInteractions.CatalogObjectInteractionName.ViewCatalogObject,
        catalogObject: {
          type: "Product",
          id: id.toString(),
          attributes: {
            productName,
            productDescription,
          },
        },
      },
    });

    return;
  };

  const userLoggedInFunction = (firstName: string, lastName: string, email: string, phoneNumber: string) => {
    if (window.SalesforceInteractions === undefined) {
      return;
    }

    const attributes = {
      eventType: "identity",
      firstName: firstName,
      lastName: lastName,
      isAnonymous: "0",
      email: email,
      phoneNumber: phoneNumber,
    };

    window.SalesforceInteractions.sendEvent({
      interaction: {
        name: "User Logged In",
        eventType: "userLoggedIn",
        category: "Engagement",
        firstName,
        lastName,
        email,
        phoneNumber,
        isAnonymous: "0",
      },
      user: {
        attributes,
      },
    });

    return;
  };

  const userLoggedOutFunction = (firstName: string, lastName: string, email: string, phoneNumber: string) => {
    if (window.SalesforceInteractions === undefined) {
      return;
    }

    const attributes = {
      eventType: "identity",
      firstName: firstName,
      lastName: lastName,
      isAnonymous: "0",
      email: email,
      phoneNumber: phoneNumber,
    };

    window.SalesforceInteractions.sendEvent({
      interaction: {
        name: "User Logged Out",
        eventType: "userLoggedOut",
        category: "Engagement",
        firstName,
        lastName,
        email,
        phoneNumber,
        isAnonymous: "0",
      },
      user: {
        attributes,
      },
    });

    return;
  };

  const personalizationBanner = async (category: [string]) => {
    try {
      const response = await window.SalesforceInteractions.Personalization.fetch(category);
      const bannerImage = response.personalizations[0]?.attributes.imageURL;

      return bannerImage;
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  const personalizationProductRecommendations = async (category: [string], anchorId?: string) => {
    try {
      const options = anchorId ? { anchorId } : undefined;
      const response = await window.SalesforceInteractions.Personalization.fetch(category, options);
      const recommendedItems = response.personalizations[0]?.data;

      return recommendedItems;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return {
    userChatMessage: userChatMessageFunction,
    viewProduct: viewProductDetailsFunction,
    userLoggedInHook: userLoggedInFunction,
    userLoggedOutHook: userLoggedOutFunction,
    personalizationBanner,
    personalizationProductRecommendations,
  };
};

export default useSalesforceInteractions;
