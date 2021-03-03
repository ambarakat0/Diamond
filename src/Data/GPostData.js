/** @format */

import img1 from '../assets/DataImgs/user1.jpg';
import img2 from '../assets/DataImgs/user3.jpg';
import img3 from '../assets/DataImgs/user2.jpg';
import img4 from '../assets/DataImgs/user4.jpg';
import imgc from '../assets/DataImgs/imgc.jpg';
import imgc2 from '../assets/DataImgs/imgc2.jpg';
import video1 from '../assets/DataVideos/video1.mp4';
import video2 from '../assets/DataVideos/video2.mp4';

export const Gposts = [
	{
		Name: 'Valy',
		NickName: 'ValyShmt',
		Text:
			'Web developers: Avoid fixed dimensions! Layout should be fluid to cater for folks with different screens, preferences.',
		Time: '8h',
		Tags: ['sport', 'tech'],
		Img: img1,
		Like: 2500,
		Share: 200,
		Comment: 10000,
		Public: true,
	},
	{
		Name: 'Balo',
		NickName: 'balobrkat',
		Text:
			"Woah! Samsung now provides 4 Years of Security Updates for the following phones!!! That's a way better selling point that Ferrari ads!!! Jokes apart, welcome news for owners!!! ",
		Time: '16h',
		Tags: ['tech'],
		Img: img2,
		Video: video1,
		Like: 1000,
		Share: 20,
		Comment: 234,
		Public: true,
	},
	{
		Name: 'Omnia',
		NickName: 'OmniMo',
		Text:
			'The free SANS ICS - Dragos CTF is now available for registration. It’s an all new day long CTF focused on ICS/OT. Register for the Summit (free too) and then in your portal account you’ll see the registration for the CTF.',
		Time: '2h',
		Tags: ['politics'],
		Img: img3,
		Video: video2,
		ImgContent: imgc,
		Like: 23,
		Share: 12,
		Comment: 103,
		Public: false,
	},
	{
		Name: 'MohamedMag',
		NickName: 'MoMagdy',
		Text:
			"Startups often wait too long to train and deploy their first machine learning model Your data is your leverage *and* your best moat against competition Don't wait to hire a data science team, use a low-code ML platform, and get started ASAP",
		Time: '1h',
		Tags: ['enverionment'],
		Img: img4,
		ImgContent: imgc2,
		Like: 635,
		Share: 103,
		Comment: 756,
		Public: true,
	},
];
