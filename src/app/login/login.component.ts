import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const labels = document.querySelectorAll('.form-control label') as NodeListOf<HTMLLabelElement>;

    labels.forEach((label: HTMLLabelElement) => {
      label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span class="animated" style="
            transition-delay:${idx * 50}ms;">${letter}</span>`).join('');
    });
    this.cdr.detectChanges();
  }
}
