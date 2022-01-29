package com.mrgrd56.javaspringwebsocketapp.ws.controllers;

import com.mrgrd56.javaspringwebsocketapp.models.FileSelection;
import com.mrgrd56.javaspringwebsocketapp.services.FileEditorService;
import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.util.HashMap;

@Controller
@MessageMapping("/fileEditor")
public class FileEditorController {

    private final FileEditorService fileEditorService;

    public FileEditorController(FileEditorService fileEditorService) {
        this.fileEditorService = fileEditorService;
    }

    @MessageMapping("/fileChange")
    @SendTo("/fileEditor/changes/file")
    public Object fileChange(String fileContent) throws IOException {
        fileEditorService.setFile(fileContent);
        return fileContent;
    }

    @MessageMapping("/selectionChange")
    @SendTo("/fileEditor/changes/selection")
    public FileSelection selectionChange(FileSelection fileSelection) {
        return fileSelection;
    }
}
