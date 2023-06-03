import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: 'landing.page.html',
  styleUrls: ['landing.page.scss'],
})
export class LandingPage {
  missionStatement: string = `Our mission at Brain Lift is to enable individuals to optimize their cognitive performance and improve their learning abilities via the efficient management of cognitive load. We aim to provide users with a thorough understanding of cognitive load, its impact on performance and learning, and practical techniques for minimizing cognitive overload. By integrating the NASA Task Load Index and our cognitive load application, Brain Lift, we enable users to evaluate their cognitive load across a variety of tasks and activities, allowing them to make informed decisions and schedule their time efficiently. Through our platform, users are able to identify areas of high cognitive load, implement cognitive load management strategies such as scaffolding, automaticity, and chunking, and ultimately achieve enhanced task completion, accelerated learning, and increased independence in daily life.`;

  constructor() { }
}
