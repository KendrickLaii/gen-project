CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username varchar(255),
	password varchar(255)
);
INSERT INTO users (username, password) VALUES ('ken', '1234'), ('jason', '1234');

CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	title TEXT,
	content TEXT,
	status TEXT,
	assign_to TEXT,
	due_date DATE,
	is_deleted boolean DEFAULT false
);

INSERT INTO tasks (title, content, status, assign_to, due_date, is_deleted) VALUES ('testTitle', 'testContent', 'TO-DO', 'Ken', '2021-12-31', false);
INSERT INTO tasks (title, content, status, assign_to, due_date, is_deleted) VALUES ('testTitle1', 'testContent1', 'On-going', 'Jan', '2021-12-30', false);
INSERT INTO tasks (title, content, status, assign_to, due_date, is_deleted) VALUES ('testTitle2', 'testContent2', 'Done', 'Tom', '2021-12-29', false);