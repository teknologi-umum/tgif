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
			photo: undefined,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "still, yang dia sampaikan masih fokus ke messaging",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			photo: undefined,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "dia fokus ke menghindari OOP ala kuliah",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			photo: undefined,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "kalau saya ngajar OOP saya lebih prefer ngga menghindari OOP ala kuliah, tapi melihat yang diajarkan di kuliah itu dari perspektif baru",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			photo: undefined,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "mari kita coba. kalian lebih prefer nulis yang mana?code A:interface User {  id: number;  name: string;  email: string;}code B:class User {  #id: number;  #name: string;  #email: string;  constructor(id: number, name: string, email: string) {    this.#id = id;    this.#name = name;    this.#email = email;  }  get id() { return this.#id; }  get name() { return this.#name; }  get email() { return this.#email; }}",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			photo: undefined,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "pasti banyak yang angkat tangan coding code A",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			photo: undefined,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "karena code B looks like bullshit",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			photo: undefined,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: 'ok lanjut. code B (atau langsung aja kita simplify jadi C) bisa kita kasih validasi di constructornya:class User {  constructor(    public readonly id: number,    public readonly name: string,    public readonly email: string  ) {    if (id <= 0) throw new ArgumentError("Invalid id");    if (name.length == 0) throw new ArgumentError("Name is empty");    if (email.length == 0) throw new ArgumentError("Email is empty");    if (isValidEmail(email)) throw new ArgumentError("Email is invalid");  }}',
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			photo: undefined,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: 'jadi dari sini coding style pengguna code A dan C bakal beda jauh. misal kita mau kirim email ke user.pengguna code A harus validasi macam2 di awal setiap function:function sendEmail(user: User) {  if (user.Id <= 0) throw new ArgumentError("Invalid id");  if (user.name.length == 0) throw new ArgumentError("Name is empty");  if (user.email.length == 0) throw new ArgumentError("Email is empty");  if (isValidEmail(user.email)) throw new ArgumentError("Email is invalid");  emailSender.send({    to: user.email,    name: user.name,    subject: "Hello world",    body: marketingEmail.composeFor(user.id)  });}pengguna code C nyantai aja langsung pakai value yang diterima sebagai parameter:function sendEmail(user: User) {  emailSender.send({    to: user.email,    name: user.name,    subject: "Hello world",    body: marketingEmail.composeFor(user.id)  });}',
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			photo: undefined,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "pengguna code A akan selalu punya kewajiban taruh a bunch of if checks di awal setiap function",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			photo: undefined,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "wah kok lebih simpel code C ya kak?",
			from: { name: "Cinammon", id: 0 },
			date: new Date(0),
			photo: undefined,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "kalau lupa ngecek sesuatu, bakal randomly ketemu bug",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			photo: undefined,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "kalau ketemu bug, developer nambahin if check dan problemnya fixed",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			photo: undefined,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "tapi that's about it. hidupnya developer model A lebih banyak testing & bug fixing daripada actually develop the code",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			photo: undefined,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "sedangkan developer model B dan C hidupnya lebih tenang dan lebih fokus ke business logic karena dengan OOP dia sudah mendapatkan jaminan validasi di mana2",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			photo: undefined,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: 'begitu ada spec berubah, atau ada perubahan method yang dipakai, atau ada perubahan message, atau perubahan di database, kita cukup ubah isi objectnya aja. nggak perlu ngecekin semua file satu2 "duh mana lagi ya yang belum ditambahin pengecekan if ini?"',
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			photo: undefined,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "simple di deklarasinya dan implementasi awal. tapi checks & guards bakal tersebar di mana2",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			photo: undefined,
			replyToMessageId: undefined,
			messageId: 0,
		},
		{
			text: "ya di C kita bisa juga bikin ADT. itu bisa diimplement dengan mindset OOP juga",
			from: { name: "Ronny Gunawan ️", id: 0 },
			date: new Date(0),
			photo: undefined,
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
			photo: undefined,
			replyToMessageId: 5130,
			text: "menarik juga sih ini ternyata seberpengaruh itu logging yah",
		},
		{
			date: new Date("2022-07-07T02:15:30.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5132,
			photo: undefined,
			replyToMessageId: undefined,
			text: 'oh iyah aku mau tanya om kan ada string date "dd-mm-yy" supaya bisa masuk ke database pake ef gimana yah datenya?',
		},
		{
			date: new Date("2022-07-07T02:34:40.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5133,
			photo: undefined,
			replyToMessageId: 5132,
			text: "EF modelnya pake DateTime atau DateTimeOffset. jadi tanggung jawab parsingnya di kamu bukan di EF",
		},
		{
			date: new Date("2022-07-07T02:35:06.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5134,
			photo: undefined,
			replyToMessageId: 5133,
			text: "hmmm berarti aku convertnya sebelum di lempar kesana yah om?",
		},
		{
			date: new Date("2022-07-07T02:35:27.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5135,
			photo: "photos/photo_284@07-07-2022_09-35-27.jpg",
			replyToMessageId: 5133,
			text: "cara gini disaranin gak sih om?",
		},
		{
			date: new Date("2022-07-07T02:49:41.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5136,
			photo: undefined,
			replyToMessageId: 5135,
			text: "ini gimana om? @RonnyGunawan ada cara lebih baik enggak selain gini?",
		},
		{
			date: new Date("2022-07-07T02:50:08.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5137,
			photo: undefined,
			replyToMessageId: 5135,
			text: "ngga",
		},
		{
			date: new Date("2022-07-07T02:50:17.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5138,
			photo: undefined,
			replyToMessageId: undefined,
			text: "udah saya kasih tau caranya",
		},
		{
			date: new Date("2022-07-07T02:50:54.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5139,
			photo: undefined,
			replyToMessageId: 5138,
			text: "iyah itu parsingnya di aku om enggak ada kaitannya sam EF",
		},
		{
			date: new Date("2022-07-07T02:51:05.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5140,
			photo: undefined,
			replyToMessageId: 5139,
			text: "tapi kamu tostring lagi",
		},
		{
			date: new Date("2022-07-07T02:51:22.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5141,
			photo: undefined,
			replyToMessageId: undefined,
			text: "buat apa diparse kalo gitu",
		},
		{
			date: new Date("2022-07-07T02:51:24.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5142,
			photo: undefined,
			replyToMessageId: 5140,
			text: "hmmm soalnya object di aku pakenya type string",
		},
		{
			date: new Date("2022-07-07T02:51:27.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5143,
			photo: "photos/photo_285@07-07-2022_09-51-27.jpg",
			replyToMessageId: undefined,
			text: "",
		},
		{
			date: new Date("2022-07-07T02:51:45.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5144,
			photo: undefined,
			replyToMessageId: undefined,
			text: "ganti aja ke datetime",
		},
		{
			date: new Date("2022-07-07T02:52:00.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5145,
			photo: undefined,
			replyToMessageId: 5144,
			text: "oke om siap",
		},
		{
			date: new Date("2022-07-07T03:21:30.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5146,
			photo: undefined,
			replyToMessageId: 5144,
			text: "oh iyah om tipe data ane kan cuman DateOnly doang gak ada timenya rekomend gak sih pake itu? kan baru hanya support di net 6.0 doang nanya aja om",
		},
		{
			date: new Date("2022-07-07T03:29:55.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5147,
			photo: undefined,
			replyToMessageId: 5146,
			text: "DateOnly ngga bisa langsung dipake di EF. harus dipasangi converter",
		},
		{
			date: new Date("2022-07-07T03:30:59.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5148,
			photo: undefined,
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
			photo: undefined,
			replyToMessageId: 5146,
			text: "soalnya kalau pake DateOnly Error di `System.Text.Json`",
		},
		{
			date: new Date("2022-07-07T03:31:51.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5150,
			photo: undefined,
			replyToMessageId: 5147,
			text: "Nah ini om di jsonnya juga masalah",
		},
		{
			date: new Date("2022-07-07T03:32:05.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5151,
			photo: undefined,
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
			photo: undefined,
			replyToMessageId: 5149,
			text: "ini juga perlu dibikinin converter",
		},
		{
			date: new Date("2022-07-07T03:32:32.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5153,
			photo: undefined,
			replyToMessageId: undefined,
			text: "tapi saya males nyari converternya",
		},
		{
			date: new Date("2022-07-07T03:32:47.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5154,
			photo: undefined,
			replyToMessageId: undefined,
			text: "kalo mau gampang pake DateTime aja",
		},
		{
			date: new Date("2022-07-07T03:33:38.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5155,
			photo: undefined,
			replyToMessageId: 5152,
			text: "Ane udah nemu om tapi bingung naronya dimananya soalnya di sourcenya gak ada bagian code parsing json dia ngelempar objek aja😅",
		},
		{
			date: new Date("2022-07-07T03:33:52.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5156,
			photo: undefined,
			replyToMessageId: 5154,
			text: "Iyah sih mungkin ini cara tercepar nnti ane pelajarin lagi soal dateonly",
		},
		{
			date: new Date("2022-07-07T03:35:13.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5157,
			photo: undefined,
			replyToMessageId: undefined,
			text: "DateOnly masih berasa kaya stranger di .net ecosystem. supportnya belum lengkap",
		},
		{
			date: new Date("2022-07-07T09:52:23.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5158,
			photo: undefined,
			replyToMessageId: undefined,
			text: "om kalau kita mau ngambil list di field buat kebutuhan select options lebih bagus pake distinct atau grouping om? yang lebih cepet",
		},
		{
			date: new Date("2022-07-07T10:29:47.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5159,
			photo: undefined,
			replyToMessageId: 5158,
			text: "ya tergantung datanya apa",
		},
		{
			date: new Date("2022-07-07T10:39:42.000Z"),
			from: { name: "Kiro Honjou", id: 719119535 },
			messageId: 5160,
			photo: undefined,
			replyToMessageId: 5159,
			text: "Datany string om jadi kek tipe gitu kan ada ada jutaan row aku mau ngambil satu field aja tapi gak duplicate om, baiknya pake grouping atau distinct kalau gitu?",
		},
		{
			date: new Date("2022-07-07T10:51:41.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5161,
			photo: undefined,
			replyToMessageId: 5160,
			text: "distinct",
		},
		{
			date: new Date("2022-07-07T10:52:51.000Z"),
			from: { name: "Ronny Gunawan ️", id: 149994951 },
			messageId: 5162,
			photo: undefined,
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
