import os

def genera_struttura_automatica():
    # Ottiene la cartella dove si trova fisicamente questo script
    root_dir = os.path.dirname(os.path.abspath(__file__))
    nome_script = os.path.basename(__file__)
    
    print(f"### Analisi automatica della cartella: `{os.path.basename(root_dir)}/` \n")
    
    # Cartelle e file da saltare sempre
    ignore_list = {'.git', '__pycache__', '.DS_Store', 'node_modules', '.idea', '.vscode', nome_script}

    for root, dirs, files in os.walk(root_dir):
        # Filtra le cartelle ignorate
        dirs[:] = [d for d in dirs if d not in ignore_list]
        
        # Calcola il livello di profondità rispetto alla cartella padre
        level = root.replace(root_dir, '').count(os.sep)
        indent = '  ' * level
        
        # Stampa il nome della cartella (se non è la root stessa)
        if root != root_dir:
            print(f"{indent}* `{os.path.basename(root)}/`:")
        
        # Stampa i file contenuti
        sub_indent = '  ' * (level + 1)
        for f in files:
            if f not in ignore_list:
                print(f"{sub_indent}* `{f}`")

if __name__ == "__main__":
    genera_struttura_automatica()