export interface CreateUrlDto {
	originalUrl: string;
	shortUrl: string;
}

export interface FindUrlByIdDto {
	id: number;
}

export interface FindUrlByShortUrlDto {
	shortUrl: string;
}

export interface DeleteUrlByIdDto {
	id: number;
}
