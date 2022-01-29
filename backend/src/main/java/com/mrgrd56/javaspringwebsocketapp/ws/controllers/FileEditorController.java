package com.mrgrd56.javaspringwebsocketapp.ws.controllers;

import com.mrgrd56.javaspringwebsocketapp.models.FileSelection;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@MessageMapping("/fileEditor")
@SendTo("/fileEditor/changes")
public class FileEditorController {

    @MessageMapping("/fileChange")
    @SendTo("/file")
    public String fileChange(String fileContent) {
        return fileContent;
    }

    @MessageMapping("/selectionChange")
    @SendTo("/selection")
    public FileSelection selectionChange(FileSelection fileSelection) {
        return fileSelection;
    }
}
