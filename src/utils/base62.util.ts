const CHARSET =
	"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const BASE = BigInt(62);

const encodeBase62 = (num: bigint): string => {
	if (num === BigInt(0)) return CHARSET[0];

	let result = "";
	let temp = num;

	while (temp > BigInt(0)) {
		// instead of 0n
		const remainder = temp % BASE;
		result = CHARSET[Number(remainder)] + result;
		temp /= BASE;
	}

	return result;
};

const decodeBase62 = (str: string): bigint => {
	let result = BigInt(0);

	for (const char of str) {
		const index = CHARSET.indexOf(char);
		if (index === -1) throw new Error(`Invalid base62 character: ${char}`);
		result = result * BASE + BigInt(index);
	}

	return result;
};

export { encodeBase62, decodeBase62 };
