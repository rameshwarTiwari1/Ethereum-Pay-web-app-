export function shortenAddress(address) {
  if (!address) return "";
  return `${address.slice(0, 5)}...${address.slice(address.length -4)}`;
}
