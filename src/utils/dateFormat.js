import { format } from 'date-fns';
import React from 'react'

export default function dateFormat(date) {
    return format(date,"yyyy-mm-dd");

}
