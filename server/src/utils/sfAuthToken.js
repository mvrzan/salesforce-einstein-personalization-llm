const sfAuthToken = async () => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  const data = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  }).toString();

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  };

  try {
    const response = await fetch(`${process.env.SALESFORCE_INSTANCE_URL}/services/oauth2/token`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `There was an error while getting the Salesforce Access Token: ${response.status} - ${response.statusText}`
      );
    }

    return { accessToken: data.access_token, instanceUrl: data.instance_url };
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default sfAuthToken;
