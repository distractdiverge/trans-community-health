export interface Creator {
  id: string;
  display_name: string;
  tiktok_handle: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Video {
  id: string;
  creator_id: string;
  video_url: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface FormSubmission {
  display_name: string;
  tiktok_handle: string;
  email: string;
  video_url: string | null;
  video_description: string | null;
  consent: boolean;
}
