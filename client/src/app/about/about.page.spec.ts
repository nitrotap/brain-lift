import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { AboutPage } from './about.page';

describe('AboutPage', () => {
    let component: AboutPage;
    let fixture: ComponentFixture<AboutPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AboutPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AboutPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have four members', () => {
        expect(component.members.length).toBe(4);
    });

    it('should have correct member details', () => {
        const firstMember = component.members[0];
        expect(firstMember.name).toBe('Kartik Jevaji');
        expect(firstMember.email).toBe('kartikinpublic@gmail.com');
        expect(firstMember.github).toBe('https://github.com/nitrotap');
        // add more assertions as required
    });

    // Add more tests if needed

});
