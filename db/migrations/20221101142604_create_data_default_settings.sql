-- migrate:up
insert into Works_Category (category_name) values ('fashion');
insert into Works_Category (category_name) values ('pattern & texture');
insert into Works_Category (category_name) values ('travel');
insert into Works_Category (category_name) values ('animal');

insert into public_status (status) values ('public');
insert into public_status (status) values ('private');
insert into public_status (status) values ('reservation');

insert into file_sort (file_sort) values ('Image');
insert into file_sort (file_sort) values ('Sound');
insert into file_sort (file_sort) values ('Video');
insert into file_sort (file_sort) values ('Picture_Book');
insert into file_sort (file_sort) values ('Wallpaper');

insert into Works_Sympathy (sympathy_sort) values ('Like');
insert into Works_Sympathy (sympathy_sort) values ('Touched');
insert into Works_Sympathy (sympathy_sort) values ('Expect');
insert into Works_Sympathy (sympathy_sort) values ('Wnat to buy');

-- migrate:down

