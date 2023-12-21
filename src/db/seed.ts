import { drizzle } from 'drizzle-orm/node-postgres'
import { sql } from 'drizzle-orm'
import { db } from '@/db'

import { Pool } from 'pg'
import { users } from '@/db/schema'
import { faker } from '@faker-js/faker'
import * as dotenv from 'dotenv'
dotenv.config({ path: './.env.development' })

if (!('DATABASE_URL' in process.env))
  throw new Error('DATABASE_URL not found on .env.development')

const main = async () => {
  const queryPosition = sql`INSERT INTO position (departement_code,departement_desc,title_code,title_desc) values
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
  ('OPT','Operations','SCC','Supply Chain Coordinator')`
  const queryUser = sql`INSERT INTO users (name, position_id, email, phone_number, hire_date, parent_id,photo)
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
      ('Emma Taylor', (SELECT position_id FROM position WHERE title_code = 'SCC'), 'emma.scc@example.com', '1234567809', '2023-01-20', 7,'a20.jpg');`

  console.log('Seed start')
  await db.execute(queryPosition)
  await db.execute(queryUser)
  console.log('Seed done')
}

main()
