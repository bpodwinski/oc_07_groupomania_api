CREATE TABLE "user"
(
    id SERIAL PRIMARY KEY,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    gravatar varchar(255) NOT NULL,
    service varchar(255) NOT NULL,
    role varchar(255) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    completed_at timestamp with time zone
);

CREATE TRIGGER set_timestamp
    BEFORE UPDATE 
    ON "user"
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();