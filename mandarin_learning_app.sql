-- -------------------------------------------
-- Database: mandarin_learning_app
-- -------------------------------------------

CREATE DATABASE IF NOT EXISTS mandarin_learning_app;
USE mandarin_learning_app;

-- -------------------------------------------
-- Table structure for `vocab`
-- -------------------------------------------
DROP TABLE IF EXISTS `vocab`;
CREATE TABLE `vocab` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `word` VARCHAR(50) NOT NULL,
  `pinyin` VARCHAR(50) NOT NULL,
  `meaning` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX idx_word (`word`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------------------
-- Sample data for `vocab` (50 words)
-- -------------------------------------------
INSERT INTO `vocab` (`word`, `pinyin`, `meaning`) VALUES
('你好','nǐ hǎo','Hello'),
('谢谢','xiè xie','Thank you'),
('再见','zài jiàn','Goodbye'),
('请','qǐng','Please'),
('对不起','duì bu qǐ','Sorry'),
('是','shì','Yes'),
('不是','bù shì','No'),
('我','wǒ','I'),
('你','nǐ','You'),
('他','tā','He'),
('她','tā','She'),
('它','tā','It'),
('我们','wǒ men','We'),
('你们','nǐ men','You all'),
('他们','tā men','They'),
('这','zhè','This'),
('那','nà','That'),
('哪','nǎ','Which'),
('什么','shén me','What'),
('谁','shéi','Who'),
('怎么','zěn me','How'),
('多少','duō shǎo','How many'),
('几','jǐ','How many (small number)'),
('哪里','nǎ lǐ','Where'),
('为什么','wèi shén me','Why'),
('时候','shí hou','Time/When'),
('怎么了','zěn me le','What happened'),
('知道','zhī dào','Know'),
('喜欢','xǐ huān','Like'),
('爱','ài','Love'),
('想','xiǎng','Want/Think'),
('有','yǒu','Have'),
('没有','méi yǒu','Do not have'),
('吃','chī','Eat'),
('喝','hē','Drink'),
('走','zǒu','Go/Walk'),
('来','lái','Come'),
('看','kàn','See/Look'),
('听','tīng','Listen'),
('说','shuō','Speak/Say'),
('读','dú','Read'),
('写','xiě','Write'),
('买','mǎi','Buy'),
('卖','mài','Sell'),
('学','xué','Learn'),
('教','jiāo','Teach'),
('工作','gōng zuò','Work/Job'),
('学校','xué xiào','School'),
('朋友','péng yǒu','Friend'),
('家','jiā','Home/Family'),
('书','shū','Book');

-- -------------------------------------------
-- Table structure for `progress`
-- -------------------------------------------
DROP TABLE IF EXISTS `progress`;
CREATE TABLE `progress` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `vocab_id` INT NOT NULL,
  `correct` TINYINT(1) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX idx_user (`user_id`),
  INDEX idx_vocab (`vocab_id`),
  FOREIGN KEY (`vocab_id`) REFERENCES `vocab`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
