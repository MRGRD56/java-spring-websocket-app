package com.mrgrd56.javaspringwebsocketapp.services;

import lombok.Getter;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class FileEditorService {

    private static final File FILE = Paths.get(System.getenv("APPDATA"), "java-spring-ws-app").toFile();

    public FileEditorService() {
        if (!FILE.exists()) {
            try {
                FILE.createNewFile();
                Files.writeString(FILE.toPath(), "Hello World");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        try {
            this.file = Files.readString(FILE.toPath());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Getter
    private String file = "";

    public void setFile(String content) throws IOException {
        Files.writeString(FILE.toPath(), content);
        file = content;
    }
}
