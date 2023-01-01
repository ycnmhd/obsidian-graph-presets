import { TFile } from "obsidian";

export const readFile = async ({file}: {file: TFile}) =>{
    return app.vault.read(file);
}
