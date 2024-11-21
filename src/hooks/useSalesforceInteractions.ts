import { readFromLocalStorage } from "../utils/localStorageUtil";

declare const window: Window &
  typeof globalThis & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SalesforceInteractions: any;
  };

interface SalesforceInteractions {
  startChat: () => void;
  viewProduct: (id: number, productName: string, productDescription: string) => void;
  userLoggedInHook: (firstName: string, lastName: string, email: string, phoneNumber: string) => void;
  userLoggedOutHook: (firstName: string, lastName: string, email: string, phoneNumber: string) => void;
}

const useSalesforceInteractions = (): SalesforceInteractions => {
  const userLoggedIn = JSON.parse(readFromLocalStorage("isAuthenticated") as string);

  const startChatFunction = () => {
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

      // TODO: Define a custom event
      // Send to Salesforce Data Cloud that a known user added a product to the cart
      window.SalesforceInteractions.sendEvent({
        interaction: {
          name: window.SalesforceInteractions.CartInteractionName.AddToCart,
          lineItem: {
            catalogObjectType: "Product",
            catalogObjectId: id.toString(),
            quantity: 1,
            price,
            currency: "USD",
            attributes: {
              title,
              description,
              rating: rating.rate,
              image,
            },
          },
        },
        user: {
          attributes,
        },
      });

      return;
    }

    // TODO: Define a custom event
    // Send to Salesforce Data Cloud that an unknown user added a product to the cart
    window.SalesforceInteractions.sendEvent({
      interaction: {
        name: window.SalesforceInteractions.CartInteractionName.AddToCart,
        lineItem: {
          catalogObjectType: "Product",
          catalogObjectId: id.toString(),
          quantity: 1,
          price: price,
          currency: "USD",
          attributes: {
            title,
            description,
            rating: rating.rate,
            image,
          },
        },
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
              productName,
              productDescription,
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

    window.SalesforceInteractions.sendEvent({
      user: {
        attributes: {
          name: "User Logged In",
          eventType: "userLoggedIn",
          firstName,
          lastName,
          email,
          phoneNumber,
          isAnonymous: "1",
        },
      },
    });

    return;
  };

  const userLoggedOutFunction = (firstName: string, lastName: string, email: string, phoneNumber: string) => {
    if (window.SalesforceInteractions === undefined) {
      return;
    }

    window.SalesforceInteractions.sendEvent({
      user: {
        attributes: {
          name: "User Logged Out",
          eventType: "userLoggedOut",
          firstName,
          lastName,
          email,
          phoneNumber,
          isAnonymous: "1",
        },
      },
    });

    return;
  };

  return {
    startChat: startChatFunction,
    viewProduct: viewProductDetailsFunction,
    userLoggedInHook: userLoggedInFunction,
    userLoggedOutHook: userLoggedOutFunction,
  };
};

export default useSalesforceInteractions;
