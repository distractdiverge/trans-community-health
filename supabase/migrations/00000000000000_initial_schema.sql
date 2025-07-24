-- Enable Row Level Security
ALTER TABLE public.creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Create policies to ensure only admins can modify data
CREATE POLICY "Admins can insert creators" ON public.creators
    FOR INSERT
    WITH CHECK (auth.role() = 'admin');

CREATE POLICY "Admins can update creators" ON public.creators
    FOR UPDATE
    USING (auth.role() = 'admin');

CREATE POLICY "Admins can delete creators" ON public.creators
    FOR DELETE
    USING (auth.role() = 'admin');

CREATE POLICY "Admins can insert videos" ON public.videos
    FOR INSERT
    WITH CHECK (auth.role() = 'admin');

CREATE POLICY "Admins can update videos" ON public.videos
    FOR UPDATE
    USING (auth.role() = 'admin');

CREATE POLICY "Admins can delete videos" ON public.videos
    FOR DELETE
    USING (auth.role() = 'admin');

-- Public read access for creators and videos
CREATE POLICY "Anyone can view creators" ON public.creators
    FOR SELECT
    USING (true);

CREATE POLICY "Anyone can view videos" ON public.videos
    FOR SELECT
    USING (true);

-- Function to handle form submissions
CREATE OR REPLACE FUNCTION handle_form_submission()
RETURNS trigger AS $$
BEGIN
    -- Insert creator if they don't exist
    INSERT INTO public.creators (tiktok_handle, display_name, email)
    VALUES (NEW.tiktok_handle, NEW.display_name, NEW.email)
    ON CONFLICT (tiktok_handle) DO UPDATE
    SET display_name = EXCLUDED.display_name,
        email = EXCLUDED.email;

    -- Insert video if provided
    IF NEW.video_url IS NOT NULL THEN
        INSERT INTO public.videos (creator_id, video_url, description)
        VALUES (
            (SELECT id FROM public.creators WHERE tiktok_handle = NEW.tiktok_handle),
            NEW.video_url,
            NEW.video_description
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to handle form submissions
CREATE TRIGGER handle_form_submission
    INSTEAD OF INSERT ON
    public.form_submissions
    FOR EACH ROW
    EXECUTE FUNCTION handle_form_submission();
