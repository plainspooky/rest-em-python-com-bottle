PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE 'users' (
  'id' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  'name' VARCHAR(64),
  'address' VARCHAR(96),
  'cpf' VARCHAR(12),
  'email' VARCHAR(32),
  'phone' VARCHAR(16),
  'sites' VARCHAR(320),
  'creation' DATE,
  'update' DATE
);
CREATE TRIGGER 'user_creation' AFTER INSERT ON 'users'
    BEGIN
    UPDATE 'users' SET 'creation'=DATETIME('NOW') WHERE rowid=new.rowid;
    END;
CREATE TRIGGER 'user_update' AFTER UPDATE ON 'users'
    BEGIN
    UPDATE 'users' SET 'update'=DATETIME('NOW') WHERE rowid=old.rowid;
    END;
COMMIT;
