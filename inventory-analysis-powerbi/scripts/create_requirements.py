import pkg_resources

def create_requirements_file(output_path="requirements.txt"):
    installed_packages = pkg_resources.working_set
    with open(output_path, "w") as f:
        for package in installed_packages:
            f.write(f"{package.project_name}=={package.version}\n")

if __name__ == "__main__":
    create_requirements_file()
    print("requirements.txt created successfully.")