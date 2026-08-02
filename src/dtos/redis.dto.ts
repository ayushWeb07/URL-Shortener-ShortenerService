export interface AddNewUrlMappingDto {
	originalUrl: string;
	shortUrl: string;
}

export interface GetUrlMappingDto {
	shortUrl: string;
}

export interface DeleteUrlMappingDto {
	shortUrl: string;
}
