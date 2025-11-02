import { merge } from 'lodash';
import Card from './Card';
import Paper from './Paper';
import Breadcrumbs from './Breadcrumbs';
import Pagination from './Pagination';
import Accordion from './Accordion';
import Button from './Button';
import Input from './Input';
import Radio from './Radio';
import Typography from './Typography';
import Skeleton from './Skeleton';
import Select from './Select';
import Link from './Link';
import LoadingButton from './LoadingButton';
import Checkbox from './Checkbox';
import ControlLabel from './ControlLabel';
import Switch from './Switch';
import Lists from './Lists';
import Tabs from './Tabs';

// ----------------------------------------------------------------------

export default function ComponentsOverrides (theme) {
    return merge(
        Card(theme),
        Paper(theme),
        Breadcrumbs(theme),
        Pagination(theme),
        Accordion(theme),
        Button(theme),
        Input(theme),
        Radio(theme),
        Typography(theme),
        Skeleton(theme),
        Select(theme),
        Link(theme),
        LoadingButton(theme),
        Checkbox(theme),
        ControlLabel(theme),
        Switch(theme),
        Lists(theme),
        Tabs(theme)
    );
}