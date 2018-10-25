import { Component } from '@angular/core';
import { UserService } from './shared/shared.module';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public hasPerm: boolean = false;
    private permMeg;
    constructor(
        private userService: UserService,
    ) {}

    public ngOnInit() {
        this.permMeg = this.userService.hasPerm.subscribe((v) => {
            this.hasPerm = v;
        });
    }

    public goLogout() {
        alert('退出');
    }

    public ngOnDestroy() {
        this.permMeg.unsubscribe();
    }
}
