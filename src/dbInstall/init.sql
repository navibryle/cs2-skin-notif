CREATE TABLE IF NOT EXISTS GUNS (
    NAME VARCHAR(255) NOT NULL,
    ID INT8,
    CONSTRAINT gun_name_unique UNIQUE (NAME),
    PRIMARY KEY(ID)
);-- this image should be a static asset
CREATE TABLE IF NOT EXISTS SKINS (
    NAME VARCHAR(255) NOT NULL,
    GUN_ID INT8,
    ID INT8,
    CONSTRAINT guns_fkey REFERENCES GUNS (GUN_ID) ON DELETE CASCADE,
    CONSTRAINT skin_name_unique UNIQUE (NAME),
    PRIMARY KEY(ID)
);-- this image should be a static asset
