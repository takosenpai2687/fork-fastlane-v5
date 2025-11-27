let fastlane;

async function onPayPalWebSdkLoaded() {
  const clientToken = await getBrowserSafeClientToken();

  const sdkInstance = await window.paypal.createInstance({
    clientToken,
    pageType: 'product-details',
    clientMetadataId: crypto.randomUUID(),
    components: ['fastlane'],
  });

  initFastlane(sdkInstance);
}

async function getBrowserSafeClientToken() {
  const response = await fetch('/paypal-api/auth/browser-safe-client-token', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const resJson = await response.json();
  console.log(`browser-safe-token:`, resJson);
  const { accessToken } = resJson;

  return accessToken;
}
