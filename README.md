# Lab Automation with Cypress
**Lab Automation Test** โดยใช้ [Cypress](https://www.cypress.io/) ครอบคลุมการทดสอบทั้ง UI และ API พร้อมการเก็บผลลัพธ์ (screenshot + json log)

## 📌 สิ่งที่ทดสอบ

1. **Login Test (UI + API)**

   * กรณีเข้าสู่ระบบสำเร็จ → ตรวจสอบข้อความบน UI และ API response
   * กรณีเข้าสู่ระบบล้มเหลว → ตรวจสอบข้อความ error บน UI และ API response

2. **Register Test (UI + API capture)**

   * สมัครสมาชิกสำเร็จ → ตรวจสอบข้อความ success บน UI
   * สมัครสมาชิกล้มเหลว (เช่น email ซ้ำ) → ตรวจสอบข้อความ error
   * ดัก request/response ของ API และบันทึกเป็นไฟล์ `cypress/fixtures/intercepted_register.json`

3. **API Replay Test**

   * โหลด fixture ที่ capture จากการสมัครสมาชิก
   * Replay API **10 รอบ** โดยเปลี่ยน email ใหม่ทุกครั้ง (`kirati_replay_xxx@mail.com`)
   * เก็บผลลัพธ์ของแต่ละรอบเป็นไฟล์ JSON ใน `cypress/results/` และ screenshot

---

## 📂 โครงสร้างไฟล์

```
cypress/
  e2e/
    login.cy.js         # ทดสอบการเข้าสู่ระบบ
    register.cy.js      # ทดสอบการสมัคร + capture API
    api_replay.cy.js    # Replay API 10 รอบ
  fixtures/
    intercepted_register.json  # บันทึก request/response ของ register
  results/
    *.json              # เก็บผลลัพธ์การทดสอบ (API replay, login result)
  support/
    commands.js         # custom command: screenshot + email generator
```

---

## ⚙️ การติดตั้ง

1. Clone โปรเจกต์นี้
2. ติดตั้ง dependencies

   ```bash
   npm install
   ```
3. เปิด Cypress GUI

   ```bash
   npx cypress open
   ```

   หรือรันแบบ headless

   ```bash
   npx cypress run
   ```

---

## ▶️ ลำดับการรัน

1. **Register Test** → เพื่อสร้าง fixture `intercepted_register.json`
2. **Login Test** → ตรวจสอบการเข้าสู่ระบบ (success/fail)
3. **API Replay Test** → ใช้ fixture จากข้อ 1 มายิงซ้ำ 10 รอบ

---

## 📸 ผลลัพธ์ที่ได้

* **Screenshots** → เก็บใน `cypress/screenshots` (มี timestamp ในชื่อไฟล์)
* **Fixtures** → `cypress/fixtures/intercepted_register.json`
* **Results** → ไฟล์ JSON เก็บผลการยิง API แต่ละรอบอยู่ใน `cypress/results/`

---

## 📝 หมายเหตุ

* ถ้าเพิ่งเข้าใช้งานเว็บใหม่ ให้รอ **30 วินาที** ก่อนยิง API (ตามข้อกำหนดของระบบ)
* Email ที่ใช้ในการ replay จะเป็นแบบอัตโนมัติ เช่น

  ```
  kirati_replay_1695900000000_1@mail.com
  kirati_replay_1695900000000_2@mail.com
  ...
  ```
* ข้อมูลตัวอย่างถูกปรับให้เป็น **Kirati Suwanpusit** / **[Kirati.su@kkumail.com](mailto:Kirati.su@kkumail.com)**
