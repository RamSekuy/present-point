#!/bin/bash

PROJECT_DIR="$(pwd)"

code "$PROJECT_DIR"

sleep 2

wmctrl -s 1

gnome-terminal -- bash -ic "
cd $PROJECT_DIR/backend
npm run dev
exec bash
"

sleep 1

BACKEND_WIN=$(wmctrl -lp | tail -1 | awk '{print $1}')

wmctrl -ir $BACKEND_WIN -e 0,0,0,960,1080

gnome-terminal -- bash -ic "
cd $PROJECT_DIR/frontend
npm run dev
exec bash
"

sleep 1

FRONTEND_WIN=$(wmctrl -lp | tail -1 | awk '{print $1}')

wmctrl -ir $FRONTEND_WIN -e 0,960,0,960,1080
