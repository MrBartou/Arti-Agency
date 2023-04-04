import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  members = [
    { name: 'John Doe', image: 'https://images.unsplash.com/photo-1503235930437-8c6293ba41f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80', position: 'developper', bio: 'Ma citation', social: {facebook: 'facebook.com', twitter: 'twitter.com', instagram: "instagram.com" } },
    { name: 'John Doe', image: 'https://images.unsplash.com/photo-1503235930437-8c6293ba41f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80', position: 'developper', bio: 'Ma citation', social: {facebook: 'facebook.com', twitter: 'twitter.com', instagram: "instagram.com" } },
    { name: 'John Doe', image: 'https://images.unsplash.com/photo-1503235930437-8c6293ba41f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80', position: 'developper', bio: 'Ma citation', social: {facebook: 'facebook.com', twitter: 'twitter.com', instagram: "instagram.com" } },
    { name: 'John Doe', image: 'https://images.unsplash.com/photo-1503235930437-8c6293ba41f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80', position: 'developper', bio: 'Ma citation', social: {facebook: 'facebook.com', twitter: 'twitter.com', instagram: "instagram.com" } },
    { name: 'John Doe', image: '', position: "design", bio: 'Ma citation', social: {facebook: 'facebook.com', twitter: 'twitter.com', instagram: "instagram.com" } },
    { name: 'John Doe', image: '', position: 'design', bio: 'Ma citation', social: {facebook: 'facebook.com', twitter: 'twitter.com', instagram: "instagram.com" } },
    { name: 'John Doe', image: '', position: 'design', bio: 'Ma citation', social: {facebook: 'facebook.com', twitter: 'twitter.com', instagram: "instagram.com" } },
    { name: 'John Doe', image: '', position: 'marketing', bio: 'Ma citation', social: {facebook: 'facebook.com', twitter: 'twitter.com', instagram: "instagram.com" } },
    { name: 'John Doe', image: '', position: 'marketing', bio: 'Ma citation', social: {facebook: 'facebook.com', twitter: 'twitter.com', instagram: "instagram.com" } },
  ];
  selectedMembers: { name: string, image: string, position: string, bio: string, social: { facebook: string, twitter: string, instagram: string } }[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const type = params['type'];
      if (type) {
        this.selectedMembers = this.members.filter(member => member.position === type);
      } else {
        this.selectedMembers = this.members;
      }
    });
  }
}
