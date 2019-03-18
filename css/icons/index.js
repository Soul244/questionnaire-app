import { Icon } from 'react-icons-kit';
import styled from 'styled-components';
import { bullhorn, statsDots } from 'react-icons-kit/icomoon/';
import { question, close } from 'react-icons-kit/fa';
import {
  ic_clear,
  ic_keyboard_arrow_down,
  ic_keyboard_arrow_up,
  ic_keyboard_arrow_left,
  ic_videocam,
  ic_image,
  ic_text_fields,
  ic_save,
  ic_add,
  ic_open_in_new,
  ic_delete,
  ic_edit,
  ic_code,
  ic_launch,
  ic_screen_share,
  ic_done,
  ic_panorama_fish_eye,
  ic_people,
  ic_menu,
  ic_phone,
  ic_email,
  ic_more_vert,
} from 'react-icons-kit/md';

const IconContainer = styled.div`
  color: ${props => props.color};
  vertical-align: text-bottom;
  display:inline-block;
`;

export default Icon;
export {
  IconContainer,
  ic_videocam as video,
  ic_text_fields as text,
  ic_image as image,
  bullhorn as audio,
  ic_add as plus,
  ic_save as save,
  ic_keyboard_arrow_down as arrowDown,
  ic_keyboard_arrow_up as arrowUp,
  ic_keyboard_arrow_left as arrowLeft,
  ic_open_in_new as preview,
  ic_edit as edit,
  ic_delete as remove2,
  close as remove3,
  statsDots as stats,
  ic_code as iframe,
  ic_launch as showPoll,
  question,
  ic_screen_share as publish,
  ic_done as done,
  ic_clear as cross,
  ic_panorama_fish_eye as unchecked,
  ic_people as users,
  ic_menu as menu,
  ic_phone as phone,
  ic_email as mail,
  ic_more_vert as threedot,
};

/* Example
  import Icon, { question, remove3 } from '../../css/icons';
  <Icon size={24} icon={arrowDown} />
*/
