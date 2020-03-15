import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingComponent } from './components/waiting/waiting.component';
import { ErrorPromptComponent } from '../home/login/error-prompt/error-prompt.component';
import { AreYouSureComponent } from './components/are-you-sure/are-you-sure.component';
import { MaterialModule } from './angular-material';

@NgModule({
  declarations: [WaitingComponent, ErrorPromptComponent, AreYouSureComponent],
  imports: [CommonModule, MaterialModule],
  exports: [WaitingComponent],
  entryComponents: [ErrorPromptComponent, AreYouSureComponent]
})
export class SharedComponentsModule {}
