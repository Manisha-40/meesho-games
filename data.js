/* Meesho Games prototype: data. All products, people and prices are made up. */
window.MG = window.MG || {};
(function (MG) {
  MG.CATS = [
    { id: 'kurtis', name: 'Ethnic Wear', short: 'Ethnic wear', art: ['photo', 'img/p27575174.jpg'] },
    { id: 'jewellery', name: 'Jewellery', short: 'Jewellery', art: ['photo', 'img/p15272716.jpg'] },
    { id: 'kids', name: 'Kids & Toys', short: 'Kids & toys', art: ['photo', 'img/p245914.jpg'] },
    { id: 'men', name: "Men's Wear", short: "Men's wear", art: ['photo', 'img/p5746087.jpg'] },
    { id: 'home', name: 'Home Decor', short: 'Home decor', art: ['photo', 'img/p6213685.jpg'] },
    { id: 'kitchen', name: 'Kitchen', short: 'Kitchen', art: ['photo', 'img/p28704740.jpg'] },
    { id: 'beauty', name: 'Beauty', short: 'Beauty', art: ['photo', 'img/p9777328.jpg'] },
    { id: 'footwear', name: 'Footwear', short: 'Footwear', art: ['photo', 'img/p1456705.jpg'] },
    { id: 'bags', name: 'Bags', short: 'Bags', art: ['photo', 'img/p1936848.jpg'] },
    { id: 'gadgets', name: 'Electronics', short: 'Electronics', art: ['photo', 'img/p15228782.jpg'] }
  ];
  MG.CATNAME = Object.fromEntries(MG.CATS.map((c) => [c.id, c.name]));

  // art: ['photo', file]  (free stock photos, Pexels)
  MG.P = [
    { id: 'p1', name: 'Women Georgette Kurta Pyjama Set', cat: 'kurtis', price: 349, mrp: 999, r: 4.1, rv: 18420, art: ['photo', 'img/p20702676.jpg'], mall: false },
    { id: 'p2', name: 'Chikankari Lehenga Choli Set, Ivory', cat: 'kurtis', price: 899, mrp: 2499, r: 4.0, rv: 3120, art: ['photo', 'img/p9418855.jpg'], mall: false },
    { id: 'p3', name: 'Embroidered Lehenga Choli with Dupatta', cat: 'kurtis', price: 799, mrp: 2299, r: 4.1, rv: 5210, art: ['photo', 'img/p13156196.jpg'], mall: false },
    { id: 'p4', name: 'Kanjeevaram Style Silk Saree with Blouse', cat: 'kurtis', price: 549, mrp: 1899, r: 4.1, rv: 22180, art: ['photo', 'img/p27575174.jpg'], mall: false },
    { id: 'p5', name: 'Zari Work Bridal Lehenga, Red', cat: 'kurtis', price: 1199, mrp: 3499, r: 4.0, rv: 1980, art: ['photo', 'img/p13661786.jpg'], mall: false },
    { id: 'p6', name: 'Kids Soft Teddy Bear, 40 cm', cat: 'kids', price: 249, mrp: 599, r: 4.3, rv: 12030, art: ['photo', 'img/p245914.jpg'], mall: false },
    { id: 'p7', name: 'Super Soft White Plush Teddy', cat: 'kids', price: 299, mrp: 699, r: 4.2, rv: 6110, art: ['photo', 'img/p754178.jpg'], mall: false },
    { id: 'p8', name: 'Wooden Number Stacker Toy', cat: 'kids', price: 249, mrp: 599, r: 4.4, rv: 4875, art: ['photo', 'img/p7269674.jpg'], mall: false },
    { id: 'p9', name: 'Wooden Pull Along Animal Toys, Set of 2', cat: 'kids', price: 199, mrp: 499, r: 4.1, rv: 3320, art: ['photo', 'img/p3661351.jpg'], mall: false },
    { id: 'p10', name: 'Wooden Building Blocks, 50 Pieces', cat: 'kids', price: 229, mrp: 599, r: 4.3, rv: 8400, art: ['photo', 'img/p3661450.jpg'], mall: false },
    { id: 'p11', name: 'Men Cotton Round Neck T-shirt', cat: 'men', price: 199, mrp: 599, r: 4.1, rv: 20410, art: ['photo', 'img/p5746087.jpg'], mall: false },
    { id: 'p12', name: 'Men Plain T-shirt Combo, Pack of 3', cat: 'men', price: 349, mrp: 1099, r: 4.2, rv: 17650, art: ['photo', 'img/p4440566.jpg'], mall: false },
    { id: 'p13', name: 'Men Cotton T-shirts, Set of 5', cat: 'men', price: 499, mrp: 1599, r: 4.0, rv: 9100, art: ['photo', 'img/p8346226.jpg'], mall: false },
    { id: 'p14', name: 'Brass Finish Diya Set of 4', cat: 'home', price: 199, mrp: 499, r: 4.4, rv: 9870, art: ['photo', 'img/p6213685.jpg'], mall: false },
    { id: 'p15', name: 'Handcrafted Brass Aarti Diya', cat: 'home', price: 129, mrp: 349, r: 4.3, rv: 5200, art: ['photo', 'img/p6315702.jpg'], mall: false },
    { id: 'p16', name: 'Brass Deepam Lamp with Stand', cat: 'home', price: 349, mrp: 899, r: 4.4, rv: 7520, art: ['photo', 'img/p9743110.jpg'], mall: false },
    { id: 'p17', name: 'Non Stick Frying Pan with Handle', cat: 'kitchen', price: 349, mrp: 899, r: 4.0, rv: 19800, art: ['photo', 'img/p3768169.jpg'], mall: false },
    { id: 'p18', name: 'Stainless Steel Kitchen Utensil Set', cat: 'kitchen', price: 599, mrp: 1599, r: 4.1, rv: 6420, art: ['photo', 'img/p28704740.jpg'], mall: false },
    { id: 'p19', name: 'Glossy Lip Gloss Combo, Pack of 6', cat: 'beauty', price: 199, mrp: 599, r: 3.9, rv: 13500, art: ['photo', 'img/p9777328.jpg'], mall: false },
    { id: 'p20', name: 'Complete Makeup Kit Combo', cat: 'beauty', price: 299, mrp: 899, r: 4.1, rv: 9100, art: ['photo', 'img/p7290715.jpg'], mall: false },
    { id: 'p21', name: 'Gold Plated Choker Necklace', cat: 'jewellery', price: 449, mrp: 1499, r: 4.1, rv: 6100, art: ['photo', 'img/p17298688.jpg'], mall: false },
    { id: 'p22', name: 'Temple Jewellery Ruby Necklace Set', cat: 'jewellery', price: 399, mrp: 1299, r: 4.2, rv: 8700, art: ['photo', 'img/p15272716.jpg'], mall: false },
    { id: 'p23', name: 'Gold Tone Lac Bangles, Set of 12', cat: 'jewellery', price: 149, mrp: 449, r: 4.3, rv: 17300, art: ['photo', 'img/p8886975.jpg'], mall: false },
    { id: 'p24', name: 'Thread Bangles Set, Multicolour', cat: 'jewellery', price: 99, mrp: 299, r: 4.2, rv: 38900, art: ['photo', 'img/p374090.jpg'], mall: false },
    { id: 'p25', name: 'Men Lightweight Running Shoes', cat: 'footwear', price: 499, mrp: 1499, r: 4.0, rv: 26100, art: ['photo', 'img/p1456705.jpg'], mall: false },
    { id: 'p26', name: 'Men Casual Sneakers, Red', cat: 'footwear', price: 449, mrp: 1299, r: 3.9, rv: 11400, art: ['photo', 'img/p1027130.jpg'], mall: false },
    { id: 'p27', name: 'Women Suede Handbag, Tan', cat: 'bags', price: 349, mrp: 1199, r: 4.0, rv: 8800, art: ['photo', 'img/p1936848.jpg'], mall: false },
    { id: 'p28', name: 'Wireless Earbuds, 30 Hour Battery', cat: 'gadgets', price: 599, mrp: 1999, r: 4.0, rv: 24000, art: ['photo', 'img/p7417547.jpg'], mall: true },
    { id: 'p29', name: 'Smart Fitness Watch, Touch Display', cat: 'gadgets', price: 799, mrp: 2999, r: 3.9, rv: 8700, art: ['photo', 'img/p15228782.jpg'], mall: true },
    { id: 'p30', name: 'TWS Earbuds with Charging Case', cat: 'gadgets', price: 649, mrp: 2199, r: 4.1, rv: 14200, art: ['photo', 'img/p33298188.jpg'], mall: true }
  ];
  MG.BYID = Object.fromEntries(MG.P.map((p) => [p.id, p]));
  MG.off = (p) => Math.round((1 - p.price / p.mrp) * 100);

  MG.OPPONENTS = [
    { id: 'pinky', name: 'Pinky', skin: '#F2C29B', hair: '#2B1B24', top: '#E2457A' },
    { id: 'raju', name: 'Raju', skin: '#C98E62', hair: '#1A1014', top: '#2C5FBF', male: true },
    { id: 'meena', name: 'Meena', skin: '#D9A877', hair: '#3A2318', top: '#2E9E7A' },
    { id: 'kavya', name: 'Kavya', skin: '#B87D55', hair: '#1A1014', top: '#FFB400' },
    { id: 'arjun', name: 'Arjun', skin: '#E0AC80', hair: '#2B1B24', top: '#7B1B6A', male: true },
    { id: 'sunita', name: 'Sunita', skin: '#C88B60', hair: '#2B1B24', top: '#E53935' },
    { id: 'lakshmi', name: 'Lakshmi', skin: '#A86F4A', hair: '#1A1014', top: '#9F2089' },
    { id: 'imran', name: 'Imran', skin: '#D7A47A', hair: '#1A1014', top: '#1F8A9E', male: true }
  ];
  MG.ME = { id: 'me', name: 'Priya', skin: '#F2C29B', hair: '#2B1B24', top: '#9F2089' };

  // Coins: 10 coins = Rs 1. Earn generously, spend is capped per order.
  MG.COIN = {
    perRupee: 10, dailyCap: 100, finish: 10, win: 10,
    housie: { early: 5, top: 10, middle: 10, bottom: 10, full: 25 },
    orderPct: 0.10, orderMaxRs: 20, expiryDays: 30, start: 40
  };

  MG.LANGS = [
    { id: 'en', label: 'English', native: 'English', ok: true },
    { id: 'hi', label: 'Hindi', native: 'हिन्दी', ok: true },
    { id: 'ta', label: 'Tamil', native: 'தமிழ்', ok: true },
    { id: 'te', label: 'Telugu', native: 'తెలుగు' },
    { id: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { id: 'bn', label: 'Bengali', native: 'বাংলা' },
    { id: 'mr', label: 'Marathi', native: 'मराठी' }
  ];

  // UI strings for the games experience. Hindi and Tamil need a native-speaker review before launch.
  MG.T = {
    en: {
      games: 'Meesho Games', mgames: 'Meesho Games', play: 'Play', playNow: 'Play now', playAgain: 'Play again', gamesHome: 'All games',
      ludo: 'Ludo', snakes: 'Snakes & Ladders', housie: 'Housie',
      ludoSub: 'Classic Ludo with 4 colours', snakesSub: 'Roll, climb, dodge the snakes', housieSub: 'Mark your ticket, call Full House',
      big: 'Big Housie', bigSub: 'Four games a day · double coins', startsIn: 'Starts in', join: 'Join', remind: 'Remind me', reminded: 'Reminder set',
      coinsToday: 'Coins today', coins: 'Coins', yourTurn: 'Your turn', tapRoll: 'Tap the dice to roll', pickToken: 'Tap a glowing token to move', thinking: 'is playing',
      luckyFind: 'Lucky find', ladderFind: 'Ladder find', view: 'View', backToGame: 'Back to game', saved: 'Saved', save: 'Save', details: 'Full details',
      paused: 'Game paused', you: 'You', won: 'You won!', placed: 'You placed', of: 'of', coinsEarned: 'coins earned', findsFrom: 'Lucky finds from this game',
      easy: 'Easy', medium: 'Medium', hard: 'Hard', players: 'Players', mode: 'Mode', quick: 'Quick', classic: 'Classic', level: 'Level',
      early: 'Early 5', top: 'Top line', middle: 'Middle line', bottom: 'Bottom line', full: 'Full House', claim: 'Claim', bogus: 'Not yet. Check your ticket.', allNums: 'All numbers',
      leave: 'Leave this game?', leaveSub: 'Your progress in this game will be lost.', stay: 'Keep playing', quit: 'Leave',
      newGame: 'New', freePlay: 'Free to play · win Meesho coins', capHit: 'Daily coin limit reached. You can still play for fun.',
      roll6: 'Roll a 6 to bring a token out', extra: 'Extra turn!', cut: 'Cut!', home: 'Home!', ladder: 'Ladder!', snake: 'Snake!',
      recentFinds: 'Your lucky finds', choose: 'Choose your language', number: 'Number'
    },
    hi: {
      games: 'मीशो गेम्स', mgames: 'मीशो गेम्स', play: 'खेलें', playNow: 'अभी खेलें', playAgain: 'फिर से खेलें', gamesHome: 'सभी गेम्स',
      ludo: 'लूडो', snakes: 'साँप सीढ़ी', housie: 'हाउज़ी',
      ludoSub: '4 रंगों वाला क्लासिक लूडो', snakesSub: 'पासा फेंको, सीढ़ी चढ़ो, साँप से बचो', housieSub: 'टिकट पर नंबर काटो, फुल हाउस बोलो',
      big: 'बिग हाउज़ी', bigSub: 'दिन में 4 गेम · डबल कॉइन्स', startsIn: 'शुरू होगा', join: 'जुड़ें', remind: 'याद दिलाएं', reminded: 'रिमाइंडर लग गया',
      coinsToday: 'आज के कॉइन्स', coins: 'कॉइन्स', yourTurn: 'आपकी बारी', tapRoll: 'पासा फेंकने के लिए टैप करें', pickToken: 'चमकती गोटी पर टैप करें', thinking: 'की बारी',
      luckyFind: 'लकी फाइंड', ladderFind: 'सीढ़ी वाला फाइंड', view: 'देखें', backToGame: 'गेम पर वापस', saved: 'सेव हुआ', save: 'सेव करें', details: 'पूरी जानकारी',
      paused: 'गेम रुका है', you: 'आप', won: 'जीत आपकी!', placed: 'आपकी रैंक', of: 'में से', coinsEarned: 'कॉइन्स मिले', findsFrom: 'इस गेम के लकी फाइंड्स',
      easy: 'आसान', medium: 'मीडियम', hard: 'मुश्किल', players: 'खिलाड़ी', mode: 'मोड', quick: 'क्विक', classic: 'क्लासिक', level: 'लेवल',
      early: 'अर्ली 5', top: 'टॉप लाइन', middle: 'मिडल लाइन', bottom: 'बॉटम लाइन', full: 'फुल हाउस', claim: 'क्लेम', bogus: 'अभी नहीं। टिकट देखें।', allNums: 'सभी नंबर',
      leave: 'गेम छोड़ना है?', leaveSub: 'इस गेम की प्रोग्रेस चली जाएगी।', stay: 'खेलते रहें', quit: 'छोड़ें',
      newGame: 'नया', freePlay: 'मुफ़्त खेलें · Meesho कॉइन्स जीतें', capHit: 'आज की कॉइन लिमिट पूरी। मज़े के लिए खेलते रहें।',
      roll6: 'गोटी निकालने के लिए 6 लाएं', extra: 'एक और बारी!', cut: 'कट गई!', home: 'घर पहुँची!', ladder: 'सीढ़ी!', snake: 'साँप!',
      recentFinds: 'आपके लकी फाइंड्स', choose: 'अपनी भाषा चुनें', number: 'नंबर'
    },
    ta: {
      games: 'மீஷோ கேம்ஸ்', mgames: 'மீஷோ கேம்ஸ்', play: 'விளையாடு', playNow: 'இப்போது விளையாடு', playAgain: 'மீண்டும் விளையாடு', gamesHome: 'எல்லா கேம்ஸ்',
      ludo: 'லூடோ', snakes: 'பரமபதம்', housie: 'ஹவுஸி',
      ludoSub: '4 வண்ண கிளாசிக் லூடோ', snakesSub: 'பகடை உருட்டு, ஏணி ஏறு, பாம்பை தவிர்', housieSub: 'டிக்கெட்டில் குறி, ஃபுல் ஹவுஸ் சொல்',
      big: 'பிக் ஹவுஸி', bigSub: 'தினமும் 4 ஆட்டம் · இரட்டை காயின்ஸ்', startsIn: 'தொடங்க', join: 'சேர்', remind: 'நினைவூட்டு', reminded: 'நினைவூட்டல் வைக்கப்பட்டது',
      coinsToday: 'இன்றைய காயின்ஸ்', coins: 'காயின்ஸ்', yourTurn: 'உங்கள் முறை', tapRoll: 'பகடையை தட்டவும்', pickToken: 'மின்னும் காயை தட்டவும்', thinking: 'விளையாடுகிறார்',
      luckyFind: 'லக்கி ஃபைண்ட்', ladderFind: 'ஏணி ஃபைண்ட்', view: 'பார்', backToGame: 'கேமுக்கு திரும்பு', saved: 'சேமிக்கப்பட்டது', save: 'சேமி', details: 'முழு விவரம்',
      paused: 'கேம் நிறுத்தப்பட்டது', you: 'நீங்கள்', won: 'நீங்கள் வென்றீர்கள்!', placed: 'உங்கள் இடம்', of: 'இல்', coinsEarned: 'காயின்ஸ் கிடைத்தது', findsFrom: 'இந்த கேமின் லக்கி ஃபைண்ட்ஸ்',
      easy: 'எளிது', medium: 'நடுத்தரம்', hard: 'கடினம்', players: 'வீரர்கள்', mode: 'மோட்', quick: 'விரைவு', classic: 'கிளாசிக்', level: 'நிலை',
      early: 'எர்லி 5', top: 'மேல் வரி', middle: 'நடு வரி', bottom: 'கீழ் வரி', full: 'ஃபுல் ஹவுஸ்', claim: 'கிளெய்ம்', bogus: 'இன்னும் இல்லை. டிக்கெட்டை பாருங்கள்.', allNums: 'எல்லா எண்கள்',
      leave: 'கேமை விட்டு வெளியேறவா?', leaveSub: 'இந்த கேமின் முன்னேற்றம் போய்விடும்.', stay: 'தொடர்ந்து விளையாடு', quit: 'வெளியேறு',
      newGame: 'புதிது', freePlay: 'இலவசம் · Meesho காயின்ஸ் வெல்லுங்கள்', capHit: 'இன்றைய காயின் வரம்பு முடிந்தது. வேடிக்கைக்காக விளையாடலாம்.',
      roll6: 'காயை வெளியே எடுக்க 6 வேண்டும்', extra: 'இன்னொரு முறை!', cut: 'வெட்டு!', home: 'வீடு சேர்ந்தது!', ladder: 'ஏணி!', snake: 'பாம்பு!',
      recentFinds: 'உங்கள் லக்கி ஃபைண்ட்ஸ்', choose: 'உங்கள் மொழியைத் தேர்ந்தெடுங்கள்', number: 'எண்'
    }
  };

  // A few well-loved Housie calls. Everything else is called by number.
  MG.CALLS = {
    1: 'Kelly’s eye', 2: 'One little duck', 7: 'Lucky seven', 8: 'One fat major', 10: 'A big fat hen', 11: 'Two beautiful legs', 16: 'Sweet sixteen',
    22: 'Two little ducks', 26: 'Republic Day', 33: 'All the threes', 44: 'All the fours', 50: 'Half century', 55: 'All the fives', 66: 'Chakke pe chakka',
    69: 'Ups and downs', 77: 'Two hockey sticks', 88: 'Two fat ladies', 90: 'Top of the house'
  };
})(window.MG);
