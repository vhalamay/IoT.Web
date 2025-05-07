using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IoT.Web.Data.Migrations
{
    /// <inheritdoc />
    public partial class ExtendImagesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Base64",
                table: "Images",
                newName: "ObjectsJson");

            migrationBuilder.AddColumn<Guid>(
                name: "ImageGuid",
                table: "Images",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageGuid",
                table: "Images");

            migrationBuilder.RenameColumn(
                name: "ObjectsJson",
                table: "Images",
                newName: "Base64");
        }
    }
}
