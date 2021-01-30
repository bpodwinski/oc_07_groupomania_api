CREATE TABLE "comment"
(
    id SERIAL PRIMARY KEY,
    user_id SERIAL NOT NULL,
    post_id SERIAL NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    completed_at timestamp with time zone,
    CONSTRAINT author FOREIGN KEY (user_id)
        REFERENCES "user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT post FOREIGN KEY (post_id)
        REFERENCES "post" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE TRIGGER set_timestamp
    BEFORE UPDATE 
    ON "comment"
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();