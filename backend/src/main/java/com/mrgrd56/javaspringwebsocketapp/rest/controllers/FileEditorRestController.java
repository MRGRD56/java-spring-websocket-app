package com.mrgrd56.javaspringwebsocketapp.rest.controllers;

import com.mrgrd56.javaspringwebsocketapp.services.FileEditorService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fileContent")
public class FileEditorRestController {

    private final FileEditorService fileEditorService;

    public FileEditorRestController(FileEditorService fileEditorService) {
        this.fileEditorService = fileEditorService;
    }

    @GetMapping(produces = MediaType.TEXT_PLAIN_VALUE)
    public String getFileContent() {
        return fileEditorService.getFile();
    }
}
