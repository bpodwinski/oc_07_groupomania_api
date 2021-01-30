CREATE TABLE "post"
(
    id SERIAL PRIMARY KEY,
    user_id SERIAL NOT NULL,
    title varchar(255) NOT NULL,
    content text NOT NULL,
    img_url varchar(255),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    completed_at timestamp with time zone,
    CONSTRAINT author FOREIGN KEY (user_id)
        REFERENCES "user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE TRIGGER set_timestamp
    BEFORE UPDATE 
    ON "post"
    FOR EACH ROW
    EXECUTE PROCEDURE public.trigger_set_timestamp();