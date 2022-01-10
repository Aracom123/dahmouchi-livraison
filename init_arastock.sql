INSERT INTO profile (id_profile, libelle) VALUES (1, 'ADMIN');
INSERT INTO profile (id_profile, libelle) VALUES (2, 'VENDEUR');
INSERT INTO utilisateur (nom, prenom, email, numero, login, password, profile_id_profile) VALUES('BAKO', 'ADAMOU', 'bako.adamou@gmail.com', '98793379', 'admin', '$2a$10$u978s2Qi3Mf.YWdMD.EIKOV7Ex70H8DQKCJvRpneXfv1zOWnjluIm', 1);
INSERT INTO societe (raison_sociale, numero_telephone, adresse_email, rccm, ninea) VALUES('ETS ELH BAKO', '98793379 / 90754710', 'etsehlbako@gmail.com', 'RCCM', 'NINEA');