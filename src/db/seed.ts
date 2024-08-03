//seed.ts
import { sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import { db } from './index'

async function main() {
  const results = await db.execute(sql`
    INSERT INTO position (departement_code,departement_desc,title_code,title_desc) values
    ('','','CEO','Chief Executive Officer'),
    ('FNC','Finance','CFO','Chief Financial Officer'),
    ('FNC','Finance','FA','Financial Analyst'),
    ('FNC','Finance','APS','Accounts Payable Specialist'),
    ('FNC','Finance','AM','Audit Manager'),
    ('HR','Human Resources','HRM','HR Manager'),
    ('HR','Human Resources','RS','Recruitment Specialist'),
    ('HR','Human Resources','ERC','Employee Relations Coordinator'),
    ('IT','Information Technology','ITM','IT Manager'),
    ('IT','Information Technology','SD','Software Developer'),
    ('IT','Information Technology','SA','Systems Administrator'),
    ('MKT','Marketing','MKM','Marketing Manager'),
    ('MKT','Marketing','DMS','Digital Marketing Specialist'),
    ('MKT','Marketing','BS','Brand Strategist'),
    ('SLS','Sales','SM','Sales Manager'),
    ('SLS','Sales','SR','Sales Representative'),
    ('SLS','Sales','AE','Account Executive'),
    ('OPT','Operations','OM','Operations Manager'),
    ('OPT','Operations','OA','Operations Analyst'),
    ('OPT','Operations','SCC','Supply Chain Coordinator')
  `)

  const results2 = await db.execute(sql`
    INSERT INTO users (name, position_id, email, phone_number, hire_date, parent_id,photo)
    VALUES
        ('Demian mav', (SELECT position_id FROM position WHERE title_code = 'CEO'), 'ceo@example.com', '1234567890', '2023-01-01', null,'a1.jpg'),
        ('Linda Wilson', (SELECT position_id FROM position WHERE title_code = 'CFO'), 'linda.cfo@example.com', '1234567891',  '2023-01-02', 1,'a2.jpg'),
        ('John Doe', (SELECT position_id FROM position WHERE title_code = 'HRM'), 'john.hrm@example.com', '1234567892', '2023-01-03', 1,'a3.jpg'),
        ('Alice Smith', (SELECT position_id FROM position WHERE title_code = 'ITM'), 'alice.itm@example.com', '1234567893', '2023-01-04', 1,'a4.jpg'),
        ('David Johnson', (SELECT position_id FROM position WHERE title_code = 'MKM'), 'david.mkm@example.com', '1234567894', '2023-01-05', 1,'a5.jpg'),
        ('Mary Brown', (SELECT position_id FROM position WHERE title_code = 'SM'), 'mary.sm@example.com', '1234567895', '2023-01-06', 1,'a6.jpg'),
        ('Robert White', (SELECT position_id FROM position WHERE title_code = 'OM'), 'robert.om@example.com', '1234567896', '2023-01-07', 1,'a7.jpg'); 
    INSERT INTO users (name, position_id, email, phone_number, hire_date, parent_id,photo)
    VALUES
        ('Karen Davis', (SELECT position_id FROM position WHERE title_code = 'FA'), 'karen.fa@example.com', '1234567897',  '2023-01-08', 2,'a8.jpg'),
        ('Mark Turner', (SELECT position_id FROM position WHERE title_code = 'APS'), 'mark.aps@example.com', '1234567898', '2023-01-09', 2,'a9.jpg'),
        ('Laura Harris', (SELECT position_id FROM position WHERE title_code = 'AM'), 'laura.am@example.com', '1234567899', '2023-01-10', 2,'a10.jpg'),
        ('Christopher Lee', (SELECT position_id FROM position WHERE title_code = 'RS'), 'christopher.rs@example.com', '1234567800', '2023-01-11', 3,'a11.jpg'),
        ('Emily Clark', (SELECT position_id FROM position WHERE title_code = 'ERC'), 'emily.erc@example.com', '1234567801','2023-01-12', 3,'a12.jpg'),
        ('Daniel Moore', (SELECT position_id FROM position WHERE title_code = 'SD'), 'daniel.sd@example.com', '1234567802', '2023-01-13', 4,'a13.jpg'),
        ('Sophia Turner', (SELECT position_id FROM position WHERE title_code = 'SA'), 'sophia.sa@example.com', '1234567803', '2023-01-14', 4,'a14.jpg'),
        ('Olivia Wilson', (SELECT position_id FROM position WHERE title_code = 'DMS'), 'olivia.dms@example.com', '1234567804', '2023-01-15', 5,'a15.jpg'),
        ('Ethan Adams', (SELECT position_id FROM position WHERE title_code = 'BS'), 'ethan.bs@example.com', '1234567805', '2023-01-16', 5,'a16.jpg'),
        ('Aiden Martin', (SELECT position_id FROM position WHERE title_code = 'SR'), 'aiden.sr@example.com', '1234567806', '2023-01-17', 6,'a17.jpg'),
        ('Nora Bennett', (SELECT position_id FROM position WHERE title_code = 'AE'), 'nora.ae@example.com', '1234567807', '2023-01-18', 6,'a18.jpg'),
        ('Owen Phillips', (SELECT position_id FROM position WHERE title_code = 'OA'), 'owen.oa@example.com', '1234567808', '2023-01-19', 7,'a19.jpg'),
        ('Emma Taylor', (SELECT position_id FROM position WHERE title_code = 'SCC'), 'emma.scc@example.com', '1234567809', '2023-01-20', 7,'a20.jpg');
    `)
  const result3 = db.execute(sql`
    insert into employee_performance (user_id,performance_score,name,photo,colorhex) values
    (1,3,'John Doe','a1.jpg','8884d8'),
    (2,4,'Jane Smith','a2.jpg','83a6ed'),
    (3,7,'Michael Johnson','a3.jpg','8dd1e1'),
    (4,10,'Sarah Brown','a4.jpg','82ca9d'),
    (5,13,'David Lee','a5.jpg','a4de6c'),
    (6,18,'Linda Wilson','a6.jpg','d0ed57'),
    (7,19,'Megan Miller','a7.jpg','ffc658'),
    (8,27,'Robert Taylor','a8.jpg','8884d8'),
    (9,33,'Emily Clark','a9.jpg','83a6ed'),
    (10,40,'William Adams','a10.jpg','8dd1e1')
`)

  const result5 = db.execute(sql`
    INSERT INTO response (response) VALUES
    ('AGREE'),
    ('DISAGREE'),
    ('INTERESTED'),
    ('NOT INTERESTED'),
    ('NEEDS MORE INFO'),
    ('REQUEST DEMO'),
    ('NEGOTIATE'),
    ('PURCHASED'),
    ('NOT PURCHASED'),
    ('FOLLOW UP');
    INSERT INTO reason (reason,response_id) VALUES
    ('Good Value',1),
    ('High Quality',1),
    ('Trusted Brand',1),
    ('Expensive',1),
    ('Low Quality',2),
    ('Bad Experience',2),
    ('New Features',3),
    ('Special Offer',3),
    ('Personal Recommendation',3),
    ('No Need',4),
    ('Competitor',4),
    ('Not Now',4),
    ('Specifications',5),
    ('Use Cases',5),
    ('Testimonials',5),
    ('Hands-On',6),
    ('Detailed Walkthrough',6),
    ('Proof of Concept',6),
    ('Price Adjustment',7),
    ('Payment Terms',7),
    ('Customization',7),
    ('Immediate Need',8),
    ('Budget Approval',8),
    ('Positive Reviews',8),
    ('Budget Issues',9),
    ('Decision Delay',9),
    ('Changed Mind',9),
    ('More Details',10),
    ('Internal Discussion',10),
    ('Next Steps',10);      
  `)

  const result7 = db.execute(sql`
    INSERT INTO upload_batch (batch_name,upload_date,uploaded_by,total_records,successful_records,failed_records,status,"source","comments",file_reference) VALUES
    ('AC1','2024-06-28 00:33:41.692','admin',1000,995,5,'Completed','CRM Export','Monthly customer data upload','/uploads/january_2024_customers.csv'),
    ('AC3','2024-06-28 00:38:00.415','admin',10,10,0,'Completed','CRM Export','Monthly customer data upload - AC3','/uploads/january_2024_customers-AC3.csv'),
    ('AC4','2024-06-28 00:38:00.415','admin',10,10,0,'Completed','CRM Export','Monthly customer data upload - AC4','/uploads/january_2024_customers-AC4.csv');  
    
    INSERT INTO customer (customer_name,reason_id,csr_user_id,email,phone,address,birth_date,registration_date,batch_id) VALUES
    ('John Doe',1,4,'john.doe@email.com','1234567890','456 Maple St','1985-02-20','2024-01-15 10:00:00',1),
    ('Jane Smith',2,4,'jane.smith@email.com','2345678901','789 Birch St','1990-05-15','2024-01-16 11:00:00',1),
    ('Alice Johnson',3,5,'alice.johnson@email.com','3456789012','101 Pine St','1982-09-25','2024-01-17 12:00:00',1),
    ('Bob Brown',4,5,'bob.brown@email.com','4567890123','202 Oak St','1975-07-10','2024-01-18 13:00:00',1),
    ('Carol White',5,5,'carol.white@email.com','5678901234','303 Cedar St','1995-11-30','2024-01-19 14:00:00',1),
    ('David Green',6,10,'david.green@email.com','6789012345','404 Elm St','1988-03-14','2024-01-20 15:00:00',1),
    ('Eva Black',7,10,'eva.black@email.com','7890123456','505 Walnut St','1993-06-18','2024-01-21 16:00:00',1),
    ('Frank Gray',8,9,'frank.gray@email.com','8901234567','606 Ash St','1981-12-05','2024-01-22 17:00:00',1),
    ('Grace Hill',9,9,'grace.hill@email.com','9012345678','707 Willow St','1992-04-23','2024-01-23 18:00:00',1),
    ('Hank King',10,9,'hank.king@email.com','0123456789','808 Poplar St','1983-08-19','2024-01-24 19:00:00',1);
    INSERT INTO customer (customer_name,reason_id,csr_user_id,email,phone,address,birth_date,registration_date,batch_id) VALUES
    ('Ivy Lee',11,9,'ivy.lee@email.com','1234567800','909 Fir St','1986-11-01','2024-01-25 10:00:00',2),
    ('Jack Miller',12,3,'jack.miller@email.com','2345678900','1010 Spruce St','1979-02-22','2024-01-26 11:00:00',2),
    ('Kelly Wilson',13,3,'kelly.wilson@email.com','3456789001','1111 Sycamore St','1984-05-16','2024-01-27 12:00:00',2),
    ('Liam Martinez',14,3,'liam.martinez@email.com','4567890012','1212 Redwood St','1980-07-28','2024-01-28 13:00:00',2),
    ('Mona Davis',15,3,'mona.davis@email.com','5678900123','1313 Dogwood St','1991-10-02','2024-01-29 14:00:00',2),
    ('Nate Moore',16,3,'nate.moore@email.com','6789012346','1414 Hawthorn St','1989-01-05','2024-01-30 15:00:00',2),
    ('Olivia Clark',17,8,'olivia.clark@email.com','7890123457','1515 Holly St','1994-06-13','2024-01-31 16:00:00',2),
    ('Paul Walker',18,8,'paul.walker@email.com','8901234568','1616 Juniper St','1987-09-09','2024-02-01 17:00:00',2),
    ('Quinn Adams',19,8,'quinn.adams@email.com','9012345679','1717 Larch St','1985-04-11','2024-02-02 18:00:00',2),
    ('Rita Scott',20,8,'rita.scott@email.com','0123456790','1818 Pinecone St','1990-08-07','2024-02-03 19:00:00',2);
    INSERT INTO customer (customer_name,reason_id,csr_user_id,email,phone,address,birth_date,registration_date,batch_id) VALUES
    ('Sam Harris',21,8,'sam.harris@email.com','1234567891','1919 Acorn St','1983-03-12','2024-02-04 10:00:00',3),
    ('Tina Lewis',22,8,'tina.lewis@email.com','2345678902','2020 Berry St','1978-11-29','2024-02-05 11:00:00',3),
    ('Uma Lopez',23,7,'uma.lopez@email.com','3456789013','2121 Chestnut St','1986-06-20','2024-02-06 12:00:00',3),
    ('Vince Carter',24,7,'vince.carter@email.com','4567890124','2222 Apple St','1975-12-14','2024-02-07 13:00:00',3),
    ('Wendy Edwards',25,7,'wendy.edwards@email.com','5678901235','2323 Grape St','1988-02-28','2024-02-08 14:00:00',3),
    ('Xander Young',26,7,'xander.young@email.com','6789012347','2424 Lemon St','1991-09-06','2024-02-09 15:00:00',3),
    ('Yara Brooks',27,7,'yara.brooks@email.com','7890123458','2525 Olive St','1979-05-08','2024-02-10 16:00:00',3),
    ('Zane Hall',28,6,'zane.hall@email.com','8901234569','2626 Peach St','1982-07-30','2024-02-11 17:00:00',3),
    ('Ada Bell',29,6,'ada.bell@email.com','9012345670','2727 Lime St','1990-11-22','2024-02-12 18:00:00',3),
    ('Ben Cook',30,6,'ben.cook@email.com','0123456791','2828 Plum St','1987-04-17','2024-02-13 19:00:00',3);        
    `)
  console.log(results)
}
main()
