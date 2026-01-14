import formatRupiah from "./formatRupiah";

export function formatShortRupiah(value) {
  const num = Number(value) || 0;
  if (num >= 1_000_000) {
    return `Rp ${(num / 1_000_000).toFixed(1)} Jt`;
  }
  return formatRupiah(num);
}

export default formatShortRupiah;
