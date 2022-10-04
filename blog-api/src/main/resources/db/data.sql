INSERT INTO POSTS(id, title, description, content, image, date, username)
VALUES ('48a95af7-8b83-4a08-8001-0f865db8ea26', 'Italy', 'Short Description', 'Full Description Full Description Full Description Full Description Full Description', 'https://www.we-heart.com/upload-images/nicefrance2.jpg', '2022-09-26 17:35', 'admin'),
       ('15a95af7-8b83-4a08-8001-0f865db8ea27', 'Greece', 'Short Description', 'Full Description Full Description Full Description Full Description Full Description', 'https://www.we-heart.com/upload-images/nicefrance2.jpg', '2022-09-26 17:35', 'admin'),
       ('ebdee4f9-5763-4afc-85ed-98b2fdefb35f', 'Lithuania', 'Short Description', 'Full Description Full Description Full Description Full Description Full Description', 'https://www.we-heart.com/upload-images/nicefrance2.jpg', '2022-09-26 17:35', 'admin'),
       ('d06cb831-9427-41ee-adcc-271f7b02d626', 'Poland', 'Short Description', 'Full Description Full Description Full Description Full Description Full Description', 'https://www.we-heart.com/upload-images/nicefrance2.jpg', '2022-09-26 17:35', 'admin'),
       ('ef90aee5-5337-4ebf-899f-e2823271f8c5', 'France', 'Short Description', 'Full Description Full Description Full Description Full Description Full Description', 'https://www.we-heart.com/upload-images/nicefrance2.jpg', '2022-09-26 17:35', 'admin'),
       ('0e706d6b-31f1-4349-a49b-9aea3400db6a', 'Turkey', 'Short Description', 'Full Description Full Description Full Description Full Description Full Description', 'https://www.we-heart.com/upload-images/nicefrance2.jpg', '2022-09-26 17:35', 'admin'),
       ('4ed39e90-efc0-4d59-bb20-29122b21e2a6', 'Scotland', 'Short Description', 'Full Description Full Description Full Description Full Description Full Description', 'https://www.we-heart.com/upload-images/nicefrance2.jpg', '2022-09-26 17:35', 'admin'),
       ('600bc230-f070-451c-bf51-9cf385dc46b7', 'Sweden', 'Short Description', 'Full Description Full Description Full Description Full Description Full Description', 'https://www.we-heart.com/upload-images/nicefrance2.jpg', '2022-09-26 17:35', 'admin');

INSERT INTO USERS(id, name, surname, username, email, password)
VALUES ('97591abe-5108-4bc2-afaa-6bc6a339619c', 'test_user', 'test_user', 'user','user@gmail.com', '{bcrypt}$2a$10$AsRCsrfh4423vjPr0xKpZeNpYixVcNtDpiGdM5xcIejUXOttH2jcu'),
       ('1c6eb4cd-b644-4932-8d88-ec97b3ba0b7b', 'test_admin', 'test_user', 'admin','admin@gmail.com', '{bcrypt}$2a$10$9Ox9WgR8X5SD04lLSdCwJ.AITH/cAZmcZ9tMkqJUFYSc0krItXT9W');

INSERT INTO ROLES(id, name)
VALUES ('7f74bb02-9f14-43ce-8b28-8c0c889d1558','USER'),
       ('25dde1c9-f740-46a7-a598-d62f37126950','ADMIN');

INSERT INTO USERS_ROLES(user_id, role_id)
VALUES ('97591abe-5108-4bc2-afaa-6bc6a339619c','7f74bb02-9f14-43ce-8b28-8c0c889d1558'),
       ('1c6eb4cd-b644-4932-8d88-ec97b3ba0b7b', '7f74bb02-9f14-43ce-8b28-8c0c889d1558'),
       ('1c6eb4cd-b644-4932-8d88-ec97b3ba0b7b', '25dde1c9-f740-46a7-a598-d62f37126950');
