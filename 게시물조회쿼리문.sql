SELECT Works_Posting.title, Works_Posting.user_id, Works_Posting.id as posting_id, 
DATE_FORMAT(Works_Posting.created_at, '%Y-%m-%d') as WPca, 
users.kor_name, upload_url, file_sort.file_sort, 
count(comment.comment) as comment_counts, 
JSON_ARRAYAGG(JSON_OBJECT("id", comment.id, "comment", comment.comment)) as comments, 
JSON_ARRAYAGG(JSON_OBJECT("tag_id", Works_tag_names.id, "tag_name", Works_tag_names.name)) as tag_name 
from Works_Posting

LEFT JOIN users on Works_Posting.user_id = users.id
LEFT JOIN upload_file on posting_id = Works_Posting.id
LEFT JOIN file_sort on file_sort.id = upload_file.file_sort_id
LEFT JOIN comment on comment.posting_id = Works_Posting.id 
LEFT JOIN Works_Posting_tags on Works_Posting_tags.posting_id = Works_Posting.id 
LEFT JOIN Works_tag_names on Works_tag_names.id = Works_Posting_tags.tag_id where Works_Posting.id = 1
GROUP BY Works_Posting.title, Works_Posting.user_id, posting_id, WPca, users.kor_name, upload_url, file_sort.file_sort;
