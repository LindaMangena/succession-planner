import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-notes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-notes.component.html',
  styleUrls: ['./manager-notes.component.scss']
})
export class ManagerNotesComponent {
  glossary = [
    {
      designation: 'High Potential',
      color: 'bg-green-100',
      potential: 'Strong in most potential characteristics. Viewed as a role model for the behaviors.',
      movement: 'Ability to move up two+ levels',
      action: 'Stretch to develop for next role now',
      guideline: '5–7% of employees at each level'
    },
    {
      designation: 'Potential To Watch',
      color: 'bg-blue-100',
      potential: 'Strong in most potential characteristics. May need more development on potential characteristics or behaviors.',
      movement: 'Ability to move up 1+ levels; in observation while potential is being tested',
      action: 'Support, enable and test',
      guideline: '5–7% of employees at each level'
    },
    {
      designation: 'Lateral Potential',
      color: 'bg-yellow-100',
      potential: 'Demonstrates some potential characteristics but needs broader development to be successful at the next level. OR—Demonstrates higher potential but does not currently aspire to advance vertically.',
      movement: 'Ability to move laterally or take on key assignments; upward movement not expected',
      action: 'Recognize and retain, plan and develop for next move',
      guideline: 'No % limit'
    },
    {
      designation: 'At Potential',
      color: 'bg-gray-100',
      potential: 'Leaders with solid or strong performance who do not exhibit the behaviors needed at the next level.',
      movement: 'None expected; does not have ability and/or motivation to move laterally',
      action: 'Coach and guide',
      guideline: 'No % limit'
    },
    {
      designation: 'Plan Intervention',
      color: 'bg-red-100',
      potential: 'Does not exhibit the behaviors needed at their current level. Performance is not meeting expectations.',
      movement: 'None expected; does not have ability and/or motivation to move laterally',
      action: 'Plan intervention',
      guideline: 'No % limit'
    }
  ];
}
