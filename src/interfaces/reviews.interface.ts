export interface ReviewUser {
  _id: string;
  name: string;
}

export interface ProductReview {
  _id: string;
  review: string; 
  rating: number; 
  user: ReviewUser;
  product: string; 
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsResponse {
  results: number;
  data: ProductReview[];
}