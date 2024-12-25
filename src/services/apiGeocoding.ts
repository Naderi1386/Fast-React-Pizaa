interface getAddressAddressType {
  latitude: number;
  longitude:number
}

export async function getAddress(userAddress:getAddressAddressType) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${userAddress.latitude}&longitude=${userAddress.longitude}`
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}
