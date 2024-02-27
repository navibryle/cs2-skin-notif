CREATE TABLE IF NOT EXISTS GUNS (
    ID INT8,
    NAME VARCHAR(255) NOT NULL,
    CONSTRAINT gun_name_unique UNIQUE (NAME),
    PRIMARY KEY(ID)
);-- this image should be a static asset
CREATE TABLE IF NOT EXISTS SKINS (
    ID INT8,
    NAME VARCHAR(255) NOT NULL,
    GUN_ID INT8,
    CONSTRAINT guns_fkey REFERENCES GUNS GUNS(GUN_ID) ON DELETE CASCADE,
    CONSTRAINT skin_name_unique UNIQUE (NAME),
    PRIMARY KEY(ID)
);-- this image should be a static asset
