const notifyAi = async (deviceId: string): Promise<void> => {
  try {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/v1/notification-service"
        : "/v1/notification-service";

    const payload = {
      deviceId,
    };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    const response = await fetch(baseUrl, config);

    if (!response.ok) {
      throw new Error(
        `There was an error when contacting the notification service: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export default notifyAi;
