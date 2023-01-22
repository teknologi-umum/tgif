import { expect, test } from "vitest";
import { Parser } from "../../src/service/Parser";

test("parse from text", () => {
	const parser = new Parser();

	const stub = `dicha?, [25/06/2022 07:25]
https://youtu.be/TbP2B1ijWr8

Ronny Gunawan ️, [25/06/2022 07:51]
still, yang dia sampaikan masih fokus ke messaging

Ronny Gunawan ️, [25/06/2022 07:53]
dia fokus ke menghindari OOP ala kuliah

Ronny Gunawan ️, [25/06/2022 07:54]
kalau saya ngajar OOP saya lebih prefer ngga menghindari OOP ala kuliah, tapi melihat yang diajarkan di kuliah itu dari perspektif baru

Ronny Gunawan ️, [25/06/2022 07:58]
mari kita coba. kalian lebih prefer nulis yang mana?

code A:

interface User {
  id: number;
  name: string;
  email: string;
}

code B:

class User {
  #id: number;
  #name: string;
  #email: string;

  constructor(id: number, name: string, email: string) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
  }

  get id() { return this.#id; }
  get name() { return this.#name; }
  get email() { return this.#email; }
}

Ronny Gunawan ️, [25/06/2022 07:59]
pasti banyak yang angkat tangan coding code A

Ronny Gunawan ️, [25/06/2022 07:59]
karena code B looks like bullshit

Ronny Gunawan ️, [25/06/2022 08:08]
ok lanjut. code B (atau langsung aja kita simplify jadi C) bisa kita kasih validasi di constructornya:

class User {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string
  ) {
    if (id <= 0) throw new ArgumentError("Invalid id");
    if (name.length == 0) throw new ArgumentError("Name is empty");
    if (email.length == 0) throw new ArgumentError("Email is empty");
    if (isValidEmail(email)) throw new ArgumentError("Email is invalid");
  }
}

Ronny Gunawan ️, [25/06/2022 08:14]
jadi dari sini coding style pengguna code A dan C bakal beda jauh. misal kita mau kirim email ke user.

pengguna code A harus validasi macam2 di awal setiap function:

function sendEmail(user: User) {
  if (user.Id <= 0) throw new ArgumentError("Invalid id");
  if (user.name.length == 0) throw new ArgumentError("Name is empty");
  if (user.email.length == 0) throw new ArgumentError("Email is empty");
  if (isValidEmail(user.email)) throw new ArgumentError("Email is invalid");

  emailSender.send({
    to: user.email,
    name: user.name,
    subject: "Hello world",
    body: marketingEmail.composeFor(user.id)
  });
}

pengguna code C nyantai aja langsung pakai value yang diterima sebagai parameter:

function sendEmail(user: User) {
  emailSender.send({
    to: user.email,
    name: user.name,
    subject: "Hello world",
    body: marketingEmail.composeFor(user.id)
  });
}

Ronny Gunawan ️, [25/06/2022 08:14]
pengguna code A akan selalu punya kewajiban taruh a bunch of if checks di awal setiap function

Cinammon, [25/06/2022 08:14]
wah kok lebih simpel code C ya kak?

Ronny Gunawan ️, [25/06/2022 08:15]
kalau lupa ngecek sesuatu, bakal randomly ketemu bug

Ronny Gunawan ️, [25/06/2022 08:15]
kalau ketemu bug, developer nambahin if check dan problemnya fixed

Ronny Gunawan ️, [25/06/2022 08:15]
tapi that's about it. hidupnya developer model A lebih banyak testing & bug fixing daripada actually develop the code

Ronny Gunawan ️, [25/06/2022 08:16]
sedangkan developer model B dan C hidupnya lebih tenang dan lebih fokus ke business logic karena dengan OOP dia sudah mendapatkan jaminan validasi di mana2

Ronny Gunawan ️, [25/06/2022 08:17]
begitu ada spec berubah, atau ada perubahan method yang dipakai, atau ada perubahan message, atau perubahan di database, kita cukup ubah isi objectnya aja. nggak perlu ngecekin semua file satu2 "duh mana lagi ya yang belum ditambahin pengecekan if ini?"

Ronny Gunawan ️, [25/06/2022 08:20]
simple di deklarasinya dan implementasi awal. tapi checks & guards bakal tersebar di mana2

Ronny Gunawan ️, [25/06/2022 08:20]
ya di C kita bisa juga bikin ADT. itu bisa diimplement dengan mindset OOP juga`;

	const telegramChat = parser.fromText("Teknologi Umum", 0, stub);

	expect(telegramChat.chatName).toEqual("Teknologi Umum");
	expect(telegramChat.chatId).toEqual(0);
	expect(telegramChat.message).toHaveLength(18);
	expect(telegramChat.message).toStrictEqual([
		{
			text: "https://youtu.be/TbP2B1ijWr8",
			from: { name: "dicha?", id: 0 },
			date: new Date(0),
			hasMedia: false,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "still, yang dia sampaikan masih fokus ke messaging",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			hasMedia: false,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "dia fokus ke menghindari OOP ala kuliah",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			hasMedia: false,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "kalau saya ngajar OOP saya lebih prefer ngga menghindari OOP ala kuliah, tapi melihat yang diajarkan di kuliah itu dari perspektif baru",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			hasMedia: false,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "mari kita coba. kalian lebih prefer nulis yang mana?code A:interface User {  id: number;  name: string;  email: string;}code B:class User {  #id: number;  #name: string;  #email: string;  constructor(id: number, name: string, email: string) {    this.#id = id;    this.#name = name;    this.#email = email;  }  get id() { return this.#id; }  get name() { return this.#name; }  get email() { return this.#email; }}",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			hasMedia: false,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "pasti banyak yang angkat tangan coding code A",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			hasMedia: false,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "karena code B looks like bullshit",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			hasMedia: false,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: 'ok lanjut. code B (atau langsung aja kita simplify jadi C) bisa kita kasih validasi di constructornya:class User {  constructor(    public readonly id: number,    public readonly name: string,    public readonly email: string  ) {    if (id <= 0) throw new ArgumentError("Invalid id");    if (name.length == 0) throw new ArgumentError("Name is empty");    if (email.length == 0) throw new ArgumentError("Email is empty");    if (isValidEmail(email)) throw new ArgumentError("Email is invalid");  }}',
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			hasMedia: false,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: 'jadi dari sini coding style pengguna code A dan C bakal beda jauh. misal kita mau kirim email ke user.pengguna code A harus validasi macam2 di awal setiap function:function sendEmail(user: User) {  if (user.Id <= 0) throw new ArgumentError("Invalid id");  if (user.name.length == 0) throw new ArgumentError("Name is empty");  if (user.email.length == 0) throw new ArgumentError("Email is empty");  if (isValidEmail(user.email)) throw new ArgumentError("Email is invalid");  emailSender.send({    to: user.email,    name: user.name,    subject: "Hello world",    body: marketingEmail.composeFor(user.id)  });}pengguna code C nyantai aja langsung pakai value yang diterima sebagai parameter:function sendEmail(user: User) {  emailSender.send({    to: user.email,    name: user.name,    subject: "Hello world",    body: marketingEmail.composeFor(user.id)  });}',
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			hasMedia: false,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "pengguna code A akan selalu punya kewajiban taruh a bunch of if checks di awal setiap function",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			hasMedia: false,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "wah kok lebih simpel code C ya kak?",
			from: { name: "Cinammon", id: 0 },
			date: new Date(0),
			hasMedia: false,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "kalau lupa ngecek sesuatu, bakal randomly ketemu bug",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			hasMedia: false,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "kalau ketemu bug, developer nambahin if check dan problemnya fixed",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			hasMedia: false,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "tapi that's about it. hidupnya developer model A lebih banyak testing & bug fixing daripada actually develop the code",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			hasMedia: false,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "sedangkan developer model B dan C hidupnya lebih tenang dan lebih fokus ke business logic karena dengan OOP dia sudah mendapatkan jaminan validasi di mana2",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			hasMedia: false,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: 'begitu ada spec berubah, atau ada perubahan method yang dipakai, atau ada perubahan message, atau perubahan di database, kita cukup ubah isi objectnya aja. nggak perlu ngecekin semua file satu2 "duh mana lagi ya yang belum ditambahin pengecekan if ini?"',
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			hasMedia: false,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "simple di deklarasinya dan implementasi awal. tapi checks & guards bakal tersebar di mana2",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			hasMedia: false,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "ya di C kita bisa juga bikin ADT. itu bisa diimplement dengan mindset OOP juga",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			hasMedia: false,
			replyToMessageId: undefined,
			messageId: 0,
		},
	]);
});

test("parse from exported chat history", () => {
	const parser = new Parser();

	const stub = `{
  "name": "C# Indonesia",
  "type": "public_supergroup",
  "id": 1730156619,
  "messages": [
    {
      "id": 5131,
      "type": "message",
      "date": "2022-07-07T09:14:48",
      "date_unixtime": "1657160088",
      "from": "Kiro Honjou",
      "from_id": "user719119535",
      "reply_to_message_id": 5130,
      "text": "menarik juga sih ini ternyata seberpengaruh itu logging yah",
      "text_entities": [
        {
          "type": "plain",
          "text": "menarik juga sih ini ternyata seberpengaruh itu logging yah"
        }
      ]
    },
    {
      "id": 5132,
      "type": "message",
      "date": "2022-07-07T09:15:30",
      "date_unixtime": "1657160130",
      "from": "Kiro Honjou",
      "from_id": "user719119535",
      "text": "oh iyah aku mau tanya om kan ada string date \\"dd-mm-yy\\" supaya bisa masuk ke database pake ef gimana yah datenya?",
      "text_entities": [
        {
          "type": "plain",
          "text": "oh iyah aku mau tanya om kan ada string date \\"dd-mm-yy\\" supaya bisa masuk ke database pake ef gimana yah datenya?"
        }
      ]
    },
    {
      "id": 5133,
      "type": "message",
      "date": "2022-07-07T09:34:40",
      "date_unixtime": "1657161280",
      "from": "Ronny Gunawan ️",
      "from_id": "user149994951",
      "reply_to_message_id": 5132,
      "text": "EF modelnya pake DateTime atau DateTimeOffset. jadi tanggung jawab parsingnya di kamu bukan di EF",
      "text_entities": [
        {
          "type": "plain",
          "text": "EF modelnya pake DateTime atau DateTimeOffset. jadi tanggung jawab parsingnya di kamu bukan di EF"
        }
      ]
    },
    {
      "id": 5134,
      "type": "message",
      "date": "2022-07-07T09:35:06",
      "date_unixtime": "1657161306",
      "from": "Kiro Honjou",
      "from_id": "user719119535",
      "reply_to_message_id": 5133,
      "text": "hmmm berarti aku convertnya sebelum di lempar kesana yah om?",
      "text_entities": [
        {
          "type": "plain",
          "text": "hmmm berarti aku convertnya sebelum di lempar kesana yah om?"
        }
      ]
    },
    {
      "id": 5135,
      "type": "message",
      "date": "2022-07-07T09:35:27",
      "date_unixtime": "1657161327",
      "edited": "2022-07-07T09:35:51",
      "edited_unixtime": "1657161351",
      "from": "Kiro Honjou",
      "from_id": "user719119535",
      "reply_to_message_id": 5133,
      "photo": "photos/photo_284@07-07-2022_09-35-27.jpg",
      "width": 1034,
      "height": 288,
      "text": "cara gini disaranin gak sih om?",
      "text_entities": [
        {
          "type": "plain",
          "text": "cara gini disaranin gak sih om?"
        }
      ]
    },
    {
      "id": 5136,
      "type": "message",
      "date": "2022-07-07T09:49:41",
      "date_unixtime": "1657162181",
      "from": "Kiro Honjou",
      "from_id": "user719119535",
      "reply_to_message_id": 5135,
      "text": [
        "ini gimana om? ",
        {
          "type": "mention",
          "text": "@RonnyGunawan"
        },
        " ada cara lebih baik enggak selain gini?"
      ],
      "text_entities": [
        {
          "type": "plain",
          "text": "ini gimana om? "
        },
        {
          "type": "mention",
          "text": "@RonnyGunawan"
        },
        {
          "type": "plain",
          "text": " ada cara lebih baik enggak selain gini?"
        }
      ]
    },
    {
      "id": 5137,
      "type": "message",
      "date": "2022-07-07T09:50:08",
      "date_unixtime": "1657162208",
      "from": "Ronny Gunawan ️",
      "from_id": "user149994951",
      "reply_to_message_id": 5135,
      "text": "ngga",
      "text_entities": [
        {
          "type": "plain",
          "text": "ngga"
        }
      ]
    },
    {
      "id": 5138,
      "type": "message",
      "date": "2022-07-07T09:50:17",
      "date_unixtime": "1657162217",
      "from": "Ronny Gunawan ️",
      "from_id": "user149994951",
      "text": "udah saya kasih tau caranya",
      "text_entities": [
        {
          "type": "plain",
          "text": "udah saya kasih tau caranya"
        }
      ]
    },
    {
      "id": 5139,
      "type": "message",
      "date": "2022-07-07T09:50:54",
      "date_unixtime": "1657162254",
      "from": "Kiro Honjou",
      "from_id": "user719119535",
      "reply_to_message_id": 5138,
      "text": "iyah itu parsingnya di aku om enggak ada kaitannya sam EF",
      "text_entities": [
        {
          "type": "plain",
          "text": "iyah itu parsingnya di aku om enggak ada kaitannya sam EF"
        }
      ]
    },
    {
      "id": 5140,
      "type": "message",
      "date": "2022-07-07T09:51:05",
      "date_unixtime": "1657162265",
      "from": "Ronny Gunawan ️",
      "from_id": "user149994951",
      "reply_to_message_id": 5139,
      "text": "tapi kamu tostring lagi",
      "text_entities": [
        {
          "type": "plain",
          "text": "tapi kamu tostring lagi"
        }
      ]
    },
    {
      "id": 5141,
      "type": "message",
      "date": "2022-07-07T09:51:22",
      "date_unixtime": "1657162282",
      "from": "Ronny Gunawan ️",
      "from_id": "user149994951",
      "text": "buat apa diparse kalo gitu",
      "text_entities": [
        {
          "type": "plain",
          "text": "buat apa diparse kalo gitu"
        }
      ]
    },
    {
      "id": 5142,
      "type": "message",
      "date": "2022-07-07T09:51:24",
      "date_unixtime": "1657162284",
      "from": "Kiro Honjou",
      "from_id": "user719119535",
      "reply_to_message_id": 5140,
      "text": "hmmm soalnya object di aku pakenya type string",
      "text_entities": [
        {
          "type": "plain",
          "text": "hmmm soalnya object di aku pakenya type string"
        }
      ]
    },
    {
      "id": 5143,
      "type": "message",
      "date": "2022-07-07T09:51:27",
      "date_unixtime": "1657162287",
      "from": "Kiro Honjou",
      "from_id": "user719119535",
      "photo": "photos/photo_285@07-07-2022_09-51-27.jpg",
      "width": 1159,
      "height": 515,
      "text": "",
      "text_entities": []
    },
    {
      "id": 5144,
      "type": "message",
      "date": "2022-07-07T09:51:45",
      "date_unixtime": "1657162305",
      "from": "Ronny Gunawan ️",
      "from_id": "user149994951",
      "text": "ganti aja ke datetime",
      "text_entities": [
        {
          "type": "plain",
          "text": "ganti aja ke datetime"
        }
      ]
    },
    {
      "id": 5145,
      "type": "message",
      "date": "2022-07-07T09:52:00",
      "date_unixtime": "1657162320",
      "from": "Kiro Honjou",
      "from_id": "user719119535",
      "reply_to_message_id": 5144,
      "text": "oke om siap",
      "text_entities": [
        {
          "type": "plain",
          "text": "oke om siap"
        }
      ]
    },
    {
      "id": 5146,
      "type": "message",
      "date": "2022-07-07T10:21:30",
      "date_unixtime": "1657164090",
      "from": "Kiro Honjou",
      "from_id": "user719119535",
      "reply_to_message_id": 5144,
      "text": "oh iyah om tipe data ane kan cuman DateOnly doang gak ada timenya rekomend gak sih pake itu? kan baru hanya support di net 6.0 doang nanya aja om",
      "text_entities": [
        {
          "type": "plain",
          "text": "oh iyah om tipe data ane kan cuman DateOnly doang gak ada timenya rekomend gak sih pake itu? kan baru hanya support di net 6.0 doang nanya aja om"
        }
      ]
    },
    {
      "id": 5147,
      "type": "message",
      "date": "2022-07-07T10:29:55",
      "date_unixtime": "1657164595",
      "from": "Ronny Gunawan ️",
      "from_id": "user149994951",
      "reply_to_message_id": 5146,
      "text": "DateOnly ngga bisa langsung dipake di EF. harus dipasangi converter",
      "text_entities": [
        {
          "type": "plain",
          "text": "DateOnly ngga bisa langsung dipake di EF. harus dipasangi converter"
        }
      ]
    },
    {
      "id": 5148,
      "type": "message",
      "date": "2022-07-07T10:30:59",
      "date_unixtime": "1657164659",
      "from": "Ronny Gunawan ️",
      "from_id": "user149994951",
      "text": [
        "di db context kamu declare ini:\\n\\n",
        {
          "type": "pre",
          "text": "private static readonly TimeOnly ZeroTime = new(0);\\n\\n    private static readonly ValueConverter<DateOnly, DateTime> DateOnlyConverter = new(\\n      convertToProviderExpression: dateOnly => dateOnly.ToDateTime(ZeroTime),\\n      convertFromProviderExpression: dateTime => DateOnly.FromDateTime(dateTime)\\n    );",
          "language": ""
        }
      ],
      "text_entities": [
        {
          "type": "plain",
          "text": "di db context kamu declare ini:\\n\\n"
        },
        {
          "type": "pre",
          "text": "private static readonly TimeOnly ZeroTime = new(0);\\n\\n    private static readonly ValueConverter<DateOnly, DateTime> DateOnlyConverter = new(\\n      convertToProviderExpression: dateOnly => dateOnly.ToDateTime(ZeroTime),\\n      convertFromProviderExpression: dateTime => DateOnly.FromDateTime(dateTime)\\n    );",
          "language": ""
        }
      ]
    },
    {
      "id": 5149,
      "type": "message",
      "date": "2022-07-07T10:31:41",
      "date_unixtime": "1657164701",
      "from": "Kiro Honjou",
      "from_id": "user719119535",
      "reply_to_message_id": 5146,
      "text": [
        "soalnya kalau pake DateOnly Error di ",
        {
          "type": "code",
          "text": "System.Text.Json"
        }
      ],
      "text_entities": [
        {
          "type": "plain",
          "text": "soalnya kalau pake DateOnly Error di "
        },
        {
          "type": "code",
          "text": "System.Text.Json"
        }
      ]
    },
    {
      "id": 5150,
      "type": "message",
      "date": "2022-07-07T10:31:51",
      "date_unixtime": "1657164711",
      "from": "Kiro Honjou",
      "from_id": "user719119535",
      "reply_to_message_id": 5147,
      "text": "Nah ini om di jsonnya juga masalah",
      "text_entities": [
        {
          "type": "plain",
          "text": "Nah ini om di jsonnya juga masalah"
        }
      ]
    },
    {
      "id": 5151,
      "type": "message",
      "date": "2022-07-07T10:32:05",
      "date_unixtime": "1657164725",
      "from": "Ronny Gunawan ️",
      "from_id": "user149994951",
      "text": [
        "lalu di OnModelCreating configure:\\n\\n",
        {
          "type": "pre",
          "text": "builder.Entity<TableName>()\\n.Property(t => t.PropertyName)\\n.HasConversion(DateOnlyConverter);",
          "language": ""
        }
      ],
      "text_entities": [
        {
          "type": "plain",
          "text": "lalu di OnModelCreating configure:\\n\\n"
        },
        {
          "type": "pre",
          "text": "builder.Entity<TableName>()\\n.Property(t => t.PropertyName)\\n.HasConversion(DateOnlyConverter);",
          "language": ""
        }
      ]
    },
    {
      "id": 5152,
      "type": "message",
      "date": "2022-07-07T10:32:21",
      "date_unixtime": "1657164741",
      "from": "Ronny Gunawan ️",
      "from_id": "user149994951",
      "reply_to_message_id": 5149,
      "text": "ini juga perlu dibikinin converter",
      "text_entities": [
        {
          "type": "plain",
          "text": "ini juga perlu dibikinin converter"
        }
      ]
    },
    {
      "id": 5153,
      "type": "message",
      "date": "2022-07-07T10:32:32",
      "date_unixtime": "1657164752",
      "from": "Ronny Gunawan ️",
      "from_id": "user149994951",
      "text": "tapi saya males nyari converternya",
      "text_entities": [
        {
          "type": "plain",
          "text": "tapi saya males nyari converternya"
        }
      ]
    },
    {
      "id": 5154,
      "type": "message",
      "date": "2022-07-07T10:32:47",
      "date_unixtime": "1657164767",
      "from": "Ronny Gunawan ️",
      "from_id": "user149994951",
      "text": "kalo mau gampang pake DateTime aja",
      "text_entities": [
        {
          "type": "plain",
          "text": "kalo mau gampang pake DateTime aja"
        }
      ]
    },
    {
      "id": 5155,
      "type": "message",
      "date": "2022-07-07T10:33:38",
      "date_unixtime": "1657164818",
      "from": "Kiro Honjou",
      "from_id": "user719119535",
      "reply_to_message_id": 5152,
      "text": "Ane udah nemu om tapi bingung naronya dimananya soalnya di sourcenya gak ada bagian code parsing json dia ngelempar objek aja😅",
      "text_entities": [
        {
          "type": "plain",
          "text": "Ane udah nemu om tapi bingung naronya dimananya soalnya di sourcenya gak ada bagian code parsing json dia ngelempar objek aja😅"
        }
      ]
    },
    {
      "id": 5156,
      "type": "message",
      "date": "2022-07-07T10:33:52",
      "date_unixtime": "1657164832",
      "from": "Kiro Honjou",
      "from_id": "user719119535",
      "reply_to_message_id": 5154,
      "text": "Iyah sih mungkin ini cara tercepar nnti ane pelajarin lagi soal dateonly",
      "text_entities": [
        {
          "type": "plain",
          "text": "Iyah sih mungkin ini cara tercepar nnti ane pelajarin lagi soal dateonly"
        }
      ]
    },
    {
      "id": 5157,
      "type": "message",
      "date": "2022-07-07T10:35:13",
      "date_unixtime": "1657164913",
      "from": "Ronny Gunawan ️",
      "from_id": "user149994951",
      "text": "DateOnly masih berasa kaya stranger di .net ecosystem. supportnya belum lengkap",
      "text_entities": [
        {
          "type": "plain",
          "text": "DateOnly masih berasa kaya stranger di .net ecosystem. supportnya belum lengkap"
        }
      ]
    },
    {
      "id": 5158,
      "type": "message",
      "date": "2022-07-07T16:52:23",
      "date_unixtime": "1657187543",
      "from": "Kiro Honjou",
      "from_id": "user719119535",
      "text": "om kalau kita mau ngambil list di field buat kebutuhan select options lebih bagus pake distinct atau grouping om? yang lebih cepet",
      "text_entities": [
        {
          "type": "plain",
          "text": "om kalau kita mau ngambil list di field buat kebutuhan select options lebih bagus pake distinct atau grouping om? yang lebih cepet"
        }
      ]
    },
    {
      "id": 5159,
      "type": "message",
      "date": "2022-07-07T17:29:47",
      "date_unixtime": "1657189787",
      "from": "Ronny Gunawan ️",
      "from_id": "user149994951",
      "reply_to_message_id": 5158,
      "text": "ya tergantung datanya apa",
      "text_entities": [
        {
          "type": "plain",
          "text": "ya tergantung datanya apa"
        }
      ]
    },
    {
      "id": 5160,
      "type": "message",
      "date": "2022-07-07T17:39:42",
      "date_unixtime": "1657190382",
      "from": "Kiro Honjou",
      "from_id": "user719119535",
      "reply_to_message_id": 5159,
      "text": "Datany string om jadi kek tipe gitu kan ada ada jutaan row aku mau ngambil satu field aja tapi gak duplicate om, baiknya pake grouping atau distinct kalau gitu?",
      "text_entities": [
        {
          "type": "plain",
          "text": "Datany string om jadi kek tipe gitu kan ada ada jutaan row aku mau ngambil satu field aja tapi gak duplicate om, baiknya pake grouping atau distinct kalau gitu?"
        }
      ]
    },
    {
      "id": 5161,
      "type": "message",
      "date": "2022-07-07T17:51:41",
      "date_unixtime": "1657191101",
      "from": "Ronny Gunawan ️",
      "from_id": "user149994951",
      "reply_to_message_id": 5160,
      "text": "distinct",
      "text_entities": [
        {
          "type": "plain",
          "text": "distinct"
        }
      ]
    },
    {
      "id": 5162,
      "type": "message",
      "date": "2022-07-07T17:52:51",
      "date_unixtime": "1657191171",
      "from": "Ronny Gunawan ️",
      "from_id": "user149994951",
      "text": [
        {
          "type": "pre",
          "text": "var values = rows\\n  .Select(row => row.PropertyYangDiambil)\\n  .Distinct()\\n  .ToHashSet();",
          "language": ""
        }
      ],
      "text_entities": [
        {
          "type": "pre",
          "text": "var values = rows\\n  .Select(row => row.PropertyYangDiambil)\\n  .Distinct()\\n  .ToHashSet();",
          "language": ""
        }
      ]
    }
  ]
}`;

	const telegramChat = parser.fromExportedChatHistory(stub);

	expect(telegramChat.chatId).toEqual(1730156619);
	expect(telegramChat.chatName).toEqual("C# Indonesia");
	expect(telegramChat.message).toHaveLength(32);
	expect(telegramChat.message).toStrictEqual([
		{
			date: new Date("2022-07-07T02:14:48.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5131,
			hasMedia: false,
			replyToMessageId: 5130,
			text: "menarik juga sih ini ternyata seberpengaruh itu logging yah",
		},
		{
			date: new Date("2022-07-07T02:15:30.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5132,
			hasMedia: false,
			replyToMessageId: undefined,
			text: 'oh iyah aku mau tanya om kan ada string date "dd-mm-yy" supaya bisa masuk ke database pake ef gimana yah datenya?',
		},
		{
			date: new Date("2022-07-07T02:34:40.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5133,
			hasMedia: false,
			replyToMessageId: 5132,
			text: "EF modelnya pake DateTime atau DateTimeOffset. jadi tanggung jawab parsingnya di kamu bukan di EF",
		},
		{
			date: new Date("2022-07-07T02:35:06.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5134,
			hasMedia: false,
			replyToMessageId: 5133,
			text: "hmmm berarti aku convertnya sebelum di lempar kesana yah om?",
		},
		{
			date: new Date("2022-07-07T02:35:27.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5135,
			file: "photos/photo_284@07-07-2022_09-35-27.jpg",
			replyToMessageId: 5133,
			text: "cara gini disaranin gak sih om?",
			hasMedia: true,
			height: 288,
			mediaType: "photo",
			width: 1034,
		},
		{
			date: new Date("2022-07-07T02:49:41.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5136,
			hasMedia: false,
			replyToMessageId: 5135,
			text: "ini gimana om? @RonnyGunawan ada cara lebih baik enggak selain gini?",
		},
		{
			date: new Date("2022-07-07T02:50:08.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5137,
			hasMedia: false,
			replyToMessageId: 5135,
			text: "ngga",
		},
		{
			date: new Date("2022-07-07T02:50:17.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5138,
			hasMedia: false,
			replyToMessageId: undefined,
			text: "udah saya kasih tau caranya",
		},
		{
			date: new Date("2022-07-07T02:50:54.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5139,
			hasMedia: false,
			replyToMessageId: 5138,
			text: "iyah itu parsingnya di aku om enggak ada kaitannya sam EF",
		},
		{
			date: new Date("2022-07-07T02:51:05.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5140,
			hasMedia: false,
			replyToMessageId: 5139,
			text: "tapi kamu tostring lagi",
		},
		{
			date: new Date("2022-07-07T02:51:22.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5141,
			hasMedia: false,
			replyToMessageId: undefined,
			text: "buat apa diparse kalo gitu",
		},
		{
			date: new Date("2022-07-07T02:51:24.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5142,
			hasMedia: false,
			replyToMessageId: 5140,
			text: "hmmm soalnya object di aku pakenya type string",
		},
		{
			date: new Date("2022-07-07T02:51:27.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5143,
			hasMedia: true,
			height: 515,
			mediaType: "photo",
			width: 1159,
			file: "photos/photo_285@07-07-2022_09-51-27.jpg",
			replyToMessageId: undefined,
			text: "",
		},
		{
			date: new Date("2022-07-07T02:51:45.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5144,
			hasMedia: false,
			replyToMessageId: undefined,
			text: "ganti aja ke datetime",
		},
		{
			date: new Date("2022-07-07T02:52:00.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5145,
			hasMedia: false,
			replyToMessageId: 5144,
			text: "oke om siap",
		},
		{
			date: new Date("2022-07-07T03:21:30.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5146,
			hasMedia: false,
			replyToMessageId: 5144,
			text: "oh iyah om tipe data ane kan cuman DateOnly doang gak ada timenya rekomend gak sih pake itu? kan baru hanya support di net 6.0 doang nanya aja om",
		},
		{
			date: new Date("2022-07-07T03:29:55.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5147,
			hasMedia: false,
			replyToMessageId: 5146,
			text: "DateOnly ngga bisa langsung dipake di EF. harus dipasangi converter",
		},
		{
			date: new Date("2022-07-07T03:30:59.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5148,
			hasMedia: false,
			replyToMessageId: undefined,
			text:
				"di db context kamu declare ini:\n" +
				"\n" +
				"```\n" +
				"private static readonly TimeOnly ZeroTime = new(0);\n" +
				"\n" +
				"    private static readonly ValueConverter<DateOnly, DateTime> DateOnlyConverter = new(\n" +
				"      convertToProviderExpression: dateOnly => dateOnly.ToDateTime(ZeroTime),\n" +
				"      convertFromProviderExpression: dateTime => DateOnly.FromDateTime(dateTime)\n" +
				"    );```\n",
		},
		{
			date: new Date("2022-07-07T03:31:41.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5149,
			hasMedia: false,
			replyToMessageId: 5146,
			text: "soalnya kalau pake DateOnly Error di `System.Text.Json`",
		},
		{
			date: new Date("2022-07-07T03:31:51.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5150,
			hasMedia: false,
			replyToMessageId: 5147,
			text: "Nah ini om di jsonnya juga masalah",
		},
		{
			date: new Date("2022-07-07T03:32:05.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5151,
			hasMedia: false,
			replyToMessageId: undefined,
			text:
				"lalu di OnModelCreating configure:\n" +
				"\n" +
				"```\n" +
				"builder.Entity<TableName>()\n" +
				".Property(t => t.PropertyName)\n" +
				".HasConversion(DateOnlyConverter);```\n",
		},
		{
			date: new Date("2022-07-07T03:32:21.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5152,
			hasMedia: false,
			replyToMessageId: 5149,
			text: "ini juga perlu dibikinin converter",
		},
		{
			date: new Date("2022-07-07T03:32:32.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5153,
			hasMedia: false,
			replyToMessageId: undefined,
			text: "tapi saya males nyari converternya",
		},
		{
			date: new Date("2022-07-07T03:32:47.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5154,
			hasMedia: false,
			replyToMessageId: undefined,
			text: "kalo mau gampang pake DateTime aja",
		},
		{
			date: new Date("2022-07-07T03:33:38.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5155,
			hasMedia: false,
			replyToMessageId: 5152,
			text: "Ane udah nemu om tapi bingung naronya dimananya soalnya di sourcenya gak ada bagian code parsing json dia ngelempar objek aja😅",
		},
		{
			date: new Date("2022-07-07T03:33:52.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5156,
			hasMedia: false,
			replyToMessageId: 5154,
			text: "Iyah sih mungkin ini cara tercepar nnti ane pelajarin lagi soal dateonly",
		},
		{
			date: new Date("2022-07-07T03:35:13.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5157,
			hasMedia: false,
			replyToMessageId: undefined,
			text: "DateOnly masih berasa kaya stranger di .net ecosystem. supportnya belum lengkap",
		},
		{
			date: new Date("2022-07-07T09:52:23.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5158,
			hasMedia: false,
			replyToMessageId: undefined,
			text: "om kalau kita mau ngambil list di field buat kebutuhan select options lebih bagus pake distinct atau grouping om? yang lebih cepet",
		},
		{
			date: new Date("2022-07-07T10:29:47.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5159,
			hasMedia: false,
			replyToMessageId: 5158,
			text: "ya tergantung datanya apa",
		},
		{
			date: new Date("2022-07-07T10:39:42.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5160,
			hasMedia: false,
			replyToMessageId: 5159,
			text: "Datany string om jadi kek tipe gitu kan ada ada jutaan row aku mau ngambil satu field aja tapi gak duplicate om, baiknya pake grouping atau distinct kalau gitu?",
		},
		{
			date: new Date("2022-07-07T10:51:41.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5161,
			hasMedia: false,
			replyToMessageId: 5160,
			text: "distinct",
		},
		{
			date: new Date("2022-07-07T10:52:51.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5162,
			hasMedia: false,
			replyToMessageId: undefined,
			text:
				"```\n" +
				"var values = rows\n" +
				"  .Select(row => row.PropertyYangDiambil)\n" +
				"  .Distinct()\n" +
				"  .ToHashSet();```\n",
		},
	]);
});

test("parse media type sticker", () => {
	const stub = `{
		"name": "Teknologi Umum v2.0",
		"type": "public_supergroup",
		"id": 1712691810,
		"messages": [
			{
				"id": 241734,
				"type": "message",
				"date": "2023-01-20T00:01:39",
				"date_unixtime": "1674147699",
				"from": "Ahmad Tohir",
				"from_id": "user368718073",
				"reply_to_message_id": 241733,
				"file": "stickers/sticker.webp",
				"thumbnail": "stickers/sticker.webp_thumb.jpg",
				"media_type": "sticker",
				"sticker_emoji": "😍",
				"width": 512,
				"height": 390,
				"text": "",
				"text_entities": []
			}
		]
	}`;

	const parser = new Parser();

	const telegramChat = parser.fromExportedChatHistory(stub);

	expect(telegramChat.chatId).toEqual(1712691810);
	expect(telegramChat.chatName).toEqual("Teknologi Umum v2.0");
	expect(telegramChat.message).toStrictEqual([
		{
			date: new Date("2023-01-19T17:01:39.000Z"),
			file: "stickers/sticker.webp",
			from: {
				id: 368718073,
				name: "Ahmad Tohir",
			},
			hasMedia: true,
			height: 390,
			mediaType: "sticker",
			messageId: 241734,
			replyToMessageId: 241733,
			text: "",
			thumbnail: "stickers/sticker.webp_thumb.jpg",
			width: 512,
		},
	]);
});

test("parse media type animation", () => {
	const stub = `{
		"name": "Teknologi Umum v2.0",
		"type": "public_supergroup",
		"id": 1712691810,
		"messages": [
			{
				"id": 243068,
				"type": "message",
				"date": "2023-01-20T22:21:10",
				"date_unixtime": "1674228070",
				"from": "La Ode",
				"from_id": "user5260310328",
				"reply_to_message_id": 243067,
				"file": "(File not included. Change data exporting settings to download.)",
				"thumbnail": "(File not included. Change data exporting settings to download.)",
				"media_type": "animation",
				"mime_type": "video/mp4",
				"duration_seconds": 2,
				"width": 320,
				"height": 212,
				"text": "",
				"text_entities": []
			}
		]
	}`;

	const parser = new Parser();

	const telegramChat = parser.fromExportedChatHistory(stub);

	expect(telegramChat.chatId).toEqual(1712691810);
	expect(telegramChat.chatName).toEqual("Teknologi Umum v2.0");
	expect(telegramChat.message).toStrictEqual([
		{
			date: new Date("2023-01-20T15:21:10.000Z"),
			file: "(File not included. Change data exporting settings to download.)",
			from: {
				id: 5260310328,
				name: "La Ode",
			},
			hasMedia: true,
			height: 212,
			mediaType: "animation",
			messageId: 243068,
			mimeType: "video/mp4",
			replyToMessageId: 243067,
			text: "",
			thumbnail: "(File not included. Change data exporting settings to download.)",
			width: 320,
		},
	]);
});

test("parse media type video", () => {
	const stub = `{
		"name": "Teknologi Umum v2.0",
		"type": "public_supergroup",
		"id": 1712691810,
		"messages": [
			{
				"id": 242829,
				"type": "message",
				"date": "2023-01-20T20:43:51",
				"date_unixtime": "1674222231",
				"from": "R",
				"from_id": "user769838460",
				"file": "(File not included. Change data exporting settings to download.)",
				"thumbnail": "(File not included. Change data exporting settings to download.)",
				"media_type": "video_file",
				"mime_type": "video/mp4",
				"duration_seconds": 9,
				"width": 800,
				"height": 800,
				"text": "",
				"text_entities": []
			}
		]
	}`;

	const parser = new Parser();

	const telegramChat = parser.fromExportedChatHistory(stub);

	expect(telegramChat.chatId).toEqual(1712691810);
	expect(telegramChat.chatName).toEqual("Teknologi Umum v2.0");
	expect(telegramChat.message).toStrictEqual([
		{
			date: new Date("2023-01-20T13:43:51.000Z"),
			file: "(File not included. Change data exporting settings to download.)",
			from: {
				id: 769838460,
				name: "R",
			},
			hasMedia: true,
			height: 800,
			mediaType: "video_file",
			messageId: 242829,
			mimeType: "video/mp4",
			replyToMessageId: undefined,
			text: "",
			thumbnail: "(File not included. Change data exporting settings to download.)",
			width: 800,
		},
	]);
});

test("parse media type photo", () => {
	const stub = `{
		"name": "Teknologi Umum v2.0",
		"type": "public_supergroup",
		"id": 1712691810,
		"messages": [
			{
				"id": 242735,
				"type": "message",
				"date": "2023-01-20T20:21:21",
				"date_unixtime": "1674220881",
				"edited": "2023-01-20T20:21:39",
				"edited_unixtime": "1674220899",
				"from": "Reinaldy",
				"from_id": "user1462097294",
				"photo": "photos/photo_10041@20-01-2023_20-21-21.jpg",
				"width": 793,
				"height": 453,
				"text": [
					"more about that in detail: ",
					{
						"type": "link",
						"text": "https://zone84.tech/architecture/london-and-detroit-schools-of-unit-tests/"
					}
				],
				"text_entities": [
					{
						"type": "plain",
						"text": "more about that in detail: "
					},
					{
						"type": "link",
						"text": "https://zone84.tech/architecture/london-and-detroit-schools-of-unit-tests/"
					}
				]
			}
		]
	}`;

	const parser = new Parser();

	const telegramChat = parser.fromExportedChatHistory(stub);

	expect(telegramChat.chatId).toEqual(1712691810);
	expect(telegramChat.chatName).toEqual("Teknologi Umum v2.0");
	expect(telegramChat.message).toStrictEqual([
		{
			date: new Date("2023-01-20T13:21:21.000Z"),
			file: "photos/photo_10041@20-01-2023_20-21-21.jpg",
			from: {
				id: 1462097294,
				name: "Reinaldy",
			},
			hasMedia: true,
			height: 453,
			mediaType: "photo",
			messageId: 242735,
			replyToMessageId: undefined,
			text: "more about that in detail: https://zone84.tech/architecture/london-and-detroit-schools-of-unit-tests/",
			width: 793,
		},
	]);
});

test("bold text", () => {
	const stub = `{
		"name": "Teknologi Umum v2.0",
		"type": "public_supergroup",
		"id": 1712691810,
		"messages": [
			{
				"id": 242556,
				"type": "message",
				"date": "2023-01-20T18:12:20",
				"date_unixtime": "1674213140",
				"from": "Terminus Est",
				"from_id": "user386213269",
				"forwarded_from": "Hacker News",
				"text": [
					{
						"type": "bold",
						"text": "Google Announces 12K Layoffs: A difficult decision to set us up for the future"
					},
					" (🔥 Score: 152+ in 39 minutes)\\n\\n",
					{
						"type": "bold",
						"text": "Link:"
					},
					" ",
					{
						"type": "link",
						"text": "https://readhacker.news/s/5wbFm"
					},
					"\\n",
					{
						"type": "bold",
						"text": "Comments:"
					},
					" ",
					{
						"type": "link",
						"text": "https://readhacker.news/c/5wbFm"
					},
					""
				],
				"text_entities": [
					{
						"type": "bold",
						"text": "Google Announces 12K Layoffs: A difficult decision to set us up for the future"
					},
					{
						"type": "plain",
						"text": " (🔥 Score: 152+ in 39 minutes)\\n\\n"
					},
					{
						"type": "bold",
						"text": "Link:"
					},
					{
						"type": "plain",
						"text": " "
					},
					{
						"type": "link",
						"text": "https://readhacker.news/s/5wbFm"
					},
					{
						"type": "plain",
						"text": "\\n"
					},
					{
						"type": "bold",
						"text": "Comments:"
					},
					{
						"type": "plain",
						"text": " "
					},
					{
						"type": "link",
						"text": "https://readhacker.news/c/5wbFm"
					},
					{
						"type": "plain",
						"text": ""
					}
				]
			}
		]
	}`;

	const parser = new Parser();

	const telegramChat = parser.fromExportedChatHistory(stub);

	expect(telegramChat.chatId).toEqual(1712691810);
	expect(telegramChat.chatName).toEqual("Teknologi Umum v2.0");
	expect(telegramChat.message).toStrictEqual([
		{
			date: new Date("2023-01-20T11:12:20.000Z"),
			from: {
				id: 386213269,
				name: "Terminus Est",
			},
			hasMedia: false,
			messageId: 242556,
			replyToMessageId: undefined,
			text:
				"**Google Announces 12K Layoffs: A difficult decision to set us up for the future** (🔥 Score: 152+ in 39 minutes)" +
				"\n\n" +
				"**Link:** https://readhacker.news/s/5wbFm" +
				"\n" +
				"**Comments:** https://readhacker.news/c/5wbFm",
		},
	]);
});

test("italic text", () => {
	const stub = `{
		"name": "Teknologi Umum v2.0",
		"type": "public_supergroup",
		"id": 1712691810,
		"messages": [
			{
				"id": 242629,
				"type": "message",
				"date": "2023-01-20T18:58:49",
				"date_unixtime": "1674215929",
				"from": "Reinaldy",
				"from_id": "user1462097294",
				"reply_to_message_id": 242628,
				"text": [
					{
						"type": "italic",
						"text": "siapa bilang saya ngoding PHP?"
					}
				],
				"text_entities": [
					{
						"type": "italic",
						"text": "siapa bilang saya ngoding PHP?"
					}
				]
			}
		]
	}`;

	const parser = new Parser();

	const telegramChat = parser.fromExportedChatHistory(stub);

	expect(telegramChat.chatId).toEqual(1712691810);
	expect(telegramChat.chatName).toEqual("Teknologi Umum v2.0");
	expect(telegramChat.message).toStrictEqual([
		{
			date: new Date("2023-01-20T18:58:49"),
			from: {
				id: 1462097294,
				name: "Reinaldy",
			},
			hasMedia: false,
			messageId: 242629,
			replyToMessageId: 242628,
			text: "*siapa bilang saya ngoding PHP?*",
		},
	]);
});

test("parse without text_entity", () => {
	const stub = `{
		"name": "Teknologi Umum v2.0",
		"type": "public_supergroup",
		"id": 1712691810,
		"messages": [
			{
				"id": 54758,
				"type": "message",
				"date": "2022-08-02T23:21:24",
				"edited": "2022-08-02T23:21:37",
				"from": "Ramad",
				"from_id": "user414742973",
				"text": "kira2 di group ini ada yang kontra dengan TDD ga ya? penasaran sama sudut pandangnya"
			},
			{
				"id": 54759,
				"type": "message",
				"date": "2022-08-02T23:21:53",
				"from": "Ronny Gunawan",
				"from_id": "user149994951",
				"text": [
					{
						"type": "link",
						"text": "https://github.com/teknologi-umum/graphene/tree/master/backend/tests"
					}
				]
			},
			{
				"id": 54807,
				"type": "message",
				"date": "2022-08-02T23:50:25",
				"from": "Ronny Gunawan",
				"from_id": "user149994951",
				"text": [
					"kadang orang suka nyampur2\\n\\n",
					{
						"type": "pre",
						"text": "public class Foo {\\n  [JsonPropertyName(\\"email\\")]\\n  [Required, EmailAddress]\\n  [Key, StringLength(50)]\\n  public string Email { get; set; }\\n}",
						"language": ""
					}
				]
			},
			{
				"id": 54811,
				"type": "message",
				"date": "2022-08-02T23:52:18",
				"from": "Kiro Honjou",
				"from_id": "user719119535",
				"reply_to_message_id": 54809,
				"text": [
					{
						"type": "link",
						"text": "https://t.me/CSharpIndonesia/4111"
					},
					"\\n\\nNah ane nemu ini dulu inget yang om pernah bilang i see isee"
				]
			},
			{
				"id": 54820,
				"type": "message",
				"date": "2022-08-02T23:58:27",
				"from": null,
				"from_id": "user1168523623",
				"text": [
					{
						"type": "italic",
						"text": "tapi om"
					}
				]
			},
			{
				"id": 54822,
				"type": "message",
				"date": "2022-08-02T23:58:28",
				"from": "Ramad",
				"from_id": "user414742973",
				"reply_to_message_id": 54801,
				"text": [
					"sepakat om ",
					{
						"type": "mention",
						"text": "@okitas0uji"
					},
					" , sempet bingung juga tp jadi clear baca ini"
				]
			},
			{
				"id": 54829,
				"type": "message",
				"date": "2022-08-03T00:01:24",
				"from": "Kiro Honjou",
				"from_id": "user719119535",
				"reply_to_message_id": 54824,
				"text": [
					"Hmm gitu yah ane masih belum masuk bagian ini nih ane nangkepnya domain model itu berkaitannya nnti ke repository sedangkan data model itu nnti larinya ke entities.",
					{
						"type": "hashtag",
						"text": "#cmiiw"
					}
				]
			}
		]
	}`;

	const parser = new Parser();

	const telegramChat = parser.fromExportedChatHistory(stub);

	expect(telegramChat.chatId).toEqual(1712691810);
	expect(telegramChat.chatName).toEqual("Teknologi Umum v2.0");
	expect(telegramChat.message).toStrictEqual([
		{
			date: new Date("2022-08-02T16:21:24.000Z"),
			from: { name: "Ramad", id: 414742973 },
			messageId: 54758,
			replyToMessageId: undefined,
			text: "kira2 di group ini ada yang kontra dengan TDD ga ya? penasaran sama sudut pandangnya",
			hasMedia: false,
		},
		{
			date: new Date("2022-08-02T16:21:53.000Z"),
			from: { name: "Ronny Gunawan", id: 149994951 },
			messageId: 54759,
			replyToMessageId: undefined,
			text: "https://github.com/teknologi-umum/graphene/tree/master/backend/tests",
			hasMedia: false,
		},
		{
			date: new Date("2022-08-02T16:50:25.000Z"),
			from: { name: "Ronny Gunawan", id: 149994951 },
			messageId: 54807,
			replyToMessageId: undefined,
			text:
				"kadang orang suka nyampur2\n" +
				"\n" +
				"```\n" +
				"public class Foo {\n" +
				'  [JsonPropertyName("email")]\n' +
				"  [Required, EmailAddress]\n" +
				"  [Key, StringLength(50)]\n" +
				"  public string Email { get; set; }\n" +
				"}```\n",
			hasMedia: false,
		},
		{
			date: new Date("2022-08-02T16:52:18.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 54811,
			replyToMessageId: 54809,
			text:
				"https://t.me/CSharpIndonesia/4111\n" +
				"\n" +
				"Nah ane nemu ini dulu inget yang om pernah bilang i see isee",
			hasMedia: false,
		},
		{
			date: new Date("2022-08-02T16:58:27.000Z"),
			from: { name: "Deleted Account", id: 1168523623 },
			messageId: 54820,
			replyToMessageId: undefined,
			text: "*tapi om*",
			hasMedia: false,
		},
		{
			date: new Date("2022-08-02T16:58:28.000Z"),
			from: { name: "Ramad", id: 414742973 },
			messageId: 54822,
			replyToMessageId: 54801,
			text: "sepakat om @okitas0uji , sempet bingung juga tp jadi clear baca ini",
			hasMedia: false,
		},
		{
			date: new Date("2022-08-02T17:01:24.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 54829,
			replyToMessageId: 54824,
			text: "Hmm gitu yah ane masih belum masuk bagian ini nih ane nangkepnya domain model itu berkaitannya nnti ke repository sedangkan data model itu nnti larinya ke entities.#cmiiw",
			hasMedia: false,
		},
	]);
});
