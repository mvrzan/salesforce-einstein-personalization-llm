const notifyAi = async (deviceId: string) => {
  try {
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

    const response = await fetch("http://localhost:3000/v1/notification-service", config);

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
};

export default notifyAi;
