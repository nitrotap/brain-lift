import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss'],
})
export class AboutPage {
  members = [
    {
      name: 'Kartik Jevaji',
      email: 'Kartikinpublic@gmail.com',
      github: 'https://github.com/nitrotap',
      linkedin: 'https://www.linkedin.com/in/kjevaji/',
      website: 'https://www.nitrotap.dev',
      avatar: 'assets/member1-avatar.jpg',
      bio: 'Full-stack web developer with strong analytical skills and educated at the University of Minnesota Coding Bootcamp. Strong skills within MERN stack with emphasis on JavaScript and Progressive Web Applications. Experienced with non-profits, CRMs, and databases. Excited to apply learned skills to develop cutting-edge applications and open-source software. A self-described Tekno-junkie that loves learning new languages and is driven to build and perfect.'
    },
    {
      name: 'Kristin Bailey',
      email: 'Kbailey007@regis.edu',
      github: 'https://github.com/highheelgeek',
      linkedin: 'https://www.linkedin.com/in/kristinbailey-colo/',
      website: 'https://www.highheelgeek.net',
      avatar: 'assets/member2-avatar.jpg',
      bio: 'Artistic, dedicated, and meticulous professional with a lifelong passion for combining technology and art. Currently pursuing a certificate in Full Stack Engineering at Regis University in Denver, CO, with an expected graduation date of June 2023. Throughout her career, she has gained valuable experience in customer service, working with diverse clients both in-person and remotely. She thrives in identifying inefficiencies and providing effective solutions for complex issues while building dynamic relationships and resolving intricate concerns to foster customer loyalty. What sets her apart is her ability to bridge the gap between different industries, fearlessly blending the everyday with an eclectic mix of interests. She enjoys bringing contrasting worlds closer together, enriching lives in the process.'
    },
    {
      name: 'Juliana Sarmo',
      email: 'Jxsarmo@gmail.com',
      github: 'https://github.com/juxsarmo',
      avatar: 'assets/member3-avatar.jpg',
      bio: 'A passionate tech enthusiast with a love for all things digital. From a young age, I've been fascinated by the ever-evolving world of technology and its impact on our lives. As a tech lover, I'm constantly seeking out opportunities to expand my knowledge and skills. Whether it's coding, web development, artificial intelligence, or cybersecurity, I'm always eager to learn and embrace new technologies. I enjoy pushing boundaries, solving complex problems, and finding innovative solutions that make a positive difference in the world.
      I find immense joy in sharing my tech insights and experiences with others, that is why I currently work as an Desktop Support engineer.  
      I truly believe that technology has the power to transform lives and shape a better future for everyone.'
    },
    {
      name: 'Jackie Reyes',
      email: 'Jreyes006@regis.edu',
      github: 'https://github.com/jreyes006',
      linkedin: '',
      website: '',
      avatar: 'assets/member4-avatar.jpg',
      bio: 'Enthusiastic about using technology for public service and resolving complex challenges because I am dedicated to a life of service. I contribute a distinctive perspective to every project thanks to my varied expertise in non-profits, technology, marketing, sales, and international relations. Educated at the University of North Texas and Regis University, I am continually advancing my expertise and skills in technology and their global applications. My extensive international travel has fostered my interest in cutting-edge technologies. With this combination of knowledge and passion, I am keen to contribute to initiatives that benefit society.'
    }
  ];

}
