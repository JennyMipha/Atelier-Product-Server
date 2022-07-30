-- CREATE DATABASE products;

-- USE products;

-- DROP TABLE IF EXISTS products, styles, features, photos, skus, related;

CREATE TABLE IF NOT EXISTS products (
  id int PRIMARY KEY,
  name varchar(100),
  slogan varchar(200),
  description varchar(500),
  category varchar(100),
  default_price int
);

CREATE TABLE IF NOT EXISTS styles (
  styled_id int PRIMARY KEY,
  product_id int references products(id),
  name varchar(100),
  sale_price int,
  original_price int,
  default_style boolean
);

CREATE TABLE IF NOT EXISTS features (
  id int PRIMARY KEY,
  product_id int REFERENCES products (id),
  feature varchar(100),
  value varchar(100)
);

CREATE TABLE IF NOT EXISTS photos (
  id int PRIMARY KEY,
  styled_id int REFERENCES styles (styled_id),
  url varchar(3000),
  thumbnail_url varchar(50000)
);

CREATE TABLE IF NOT EXISTS skus (
  id int PRIMARY KEY,
  styled_id int REFERENCES styles (styled_id),
  size varchar(10),
  quantity int
);

CREATE TABLE IF NOT EXISTS related (
  id int PRIMARY KEY,
  product_id int REFERENCES products (id),
  related_product_id int
  -- REFERENCES products (id)
  -- UNIQUE (related_product_id, product_id)
);

-- COPY products FROM '/Users/jennifer/Desktop/HR/Pokemon-SDC/data/product.csv' DELIMITER ',' CSV HEADER;
-- COPY styles FROM '/Users/jennifer/Desktop/HR/Pokemon-SDC/data/styles.csv' DELIMITER ',' NULL 'null' CSV HEADER;
-- COPY features FROM '/Users/jennifer/Desktop/HR/Pokemon-SDC/data/features.csv' DELIMITER ',' CSV HEADER;
COPY photos FROM '/Users/jennifer/Desktop/HR/Pokemon-SDC/data/photos.csv' DELIMITER ',' CSV HEADER;
-- COPY skus FROM '/Users/jennifer/Desktop/HR/Pokemon-SDC/data/skus.csv' DELIMITER ',' CSV HEADER;
COPY related FROM '/Users/jennifer/Desktop/HR/Pokemon-SDC/data/related.csv' DELIMITER ',' CSV HEADER;

